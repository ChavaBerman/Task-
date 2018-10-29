import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  WorkerHoursService, UserService,
  WorkerHours, User
} from '../../imports';

@Component({
  selector: 'app-worker-hours-management',
  templateUrl: './worker-hours-management.component.html',
  styleUrls: ['./worker-hours-management.component.css']
})
export class WorkerHoursManagementComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  workerId: number;
  worker: User;
  workerHoursList: WorkerHours[];

  deleteWorkerHoursList: number[] = [];
  addWorkerHoursList: WorkerHours[] = [];
  editWorkerHoursList: WorkerHours[] = [];

  //----------------CONSTRUCTOR------------------

  constructor(
    private activatedRoute: ActivatedRoute,
    private workerHoursService: WorkerHoursService,
    private userService: UserService
  ) {
    workerHoursService.changeWorkerHoursSubject.subscribe(
      (workerHours: WorkerHours) => {
        this.changeWorkerHours(workerHours);
      }
    );
    workerHoursService.deleteWorkerHoursSubject.subscribe(
      (workerHours: WorkerHours) => {
        this.deleteWorkerHours(workerHours);
      }
    );
    workerHoursService.addWorkerHoursSubject.subscribe(
      (workerHours: WorkerHours) => {
        this.addWorkerHours(workerHours);
      }
    );
  }

  //----------------METHODS-------------------

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => this.workerId = param['id']);
    this.getAllWorkerHours();
    this.getWorker();
  }

  getAllWorkerHours() {
    this.workerHoursService.getAllWorkerHours(this.workerId).subscribe(
      (workerHoursList: WorkerHours[]) => {
        this.workerHoursList = workerHoursList;
        this.worker
      },
      err => {
        console.log(err);
      }
    );
  }

  getWorker() {
    this.userService.getUserById(this.workerId).subscribe(
      (worker: User) => {
        this.worker = worker;
      }, err => {
        console.log(err);
      }
    );
  }

  changeWorkerHours(workerHours: WorkerHours) {
    this.workerHoursList.find(w => w.workerHoursId == workerHours.workerHoursId).numHours = workerHours.numHours;
    let tmp: WorkerHours = this.addWorkerHoursList.find(w => w.workerHoursId == workerHours.workerHoursId);
    if (tmp) {
      tmp.numHours = workerHours.numHours;
    }
    else
      this.editWorkerHoursList.push(this.newWorkerHours(workerHours));
  }

  deleteWorkerHours(workerHours: WorkerHours) {
    let index: number = this.workerHoursList.indexOf(workerHours)
    this.workerHoursList.splice(index, 1);
    index = this.addWorkerHoursList.indexOf(workerHours);
    if (index >= 0)
      this.addWorkerHoursList.splice(index, 1)
    this.deleteWorkerHoursList.push(workerHours.workerHoursId);
  }

  addWorkerHours(workerHours: WorkerHours) {
    workerHours.workerId = this.workerId;
    this.workerHoursList.push(workerHours);
    this.addWorkerHoursList.push(this.newWorkerHours(workerHours));
  }

  async saveChanges() {
    //add
    await this.workerHoursService.addWorkersHours(this.addWorkerHoursList)
    //edit
    await this.workerHoursService.editWorkersHours(this.editWorkerHoursList)
    //delete
    await this.workerHoursService.deleteWorkersHours(this.deleteWorkerHoursList);
  }

  newWorkerHours(workerHours: WorkerHours) {
    return new WorkerHours(workerHours.workerHoursId, workerHours.projectId, workerHours.workerId, workerHours.numHours, true);
  }
}
