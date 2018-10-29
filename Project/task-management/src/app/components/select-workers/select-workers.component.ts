import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService, User } from '../../imports';

@Component({
  selector: 'app-select-workers',
  templateUrl: './select-workers.component.html',
  styleUrls: ['./select-workers.component.css']
})
export class SelectWorkersComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  workers: User[];

  @Input()
  title: string;

  @Input()
  isTeamManagement: boolean = false;

  selectedWorkers: User[] = [];

  selectedWorkerControl: FormControl;

  @Output()
  selectedWorkerEvent: EventEmitter<User[]>;

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService) {

    this.selectedWorkerControl = new FormControl('');
    this.selectedWorkerEvent = new EventEmitter<User[]>();

    this.userService.resetPermissionSubject.subscribe(
      () => {
        this.selectedWorkers = [];
      }
    );
  }

  //----------------METHODS-------------------

  addWorker() {
    let worker: User = this.selectedWorkerControl.value;
    this.selectedWorkers.push(worker);
    this.workers.splice(this.workers.indexOf(worker), 1);
    if (this.isTeamManagement == false)
      this.selectedWorkerEvent.emit(this.selectedWorkers);
  }

  removeWorker(worker: User) {
    this.workers.push(worker);
    this.selectedWorkerControl.setValue(null);
    this.selectedWorkers.splice(this.selectedWorkers.indexOf(worker), 1);
    if (this.isTeamManagement == false)
      this.selectedWorkerEvent.emit(this.selectedWorkers);

  }

  submit() {
    this.selectedWorkerEvent.emit(this.selectedWorkers);
  }
}
