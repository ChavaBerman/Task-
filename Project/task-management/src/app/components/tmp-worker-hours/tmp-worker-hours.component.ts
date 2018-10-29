import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkerHours, stringValidatorArr } from '../../imports';
import { WorkerHoursService } from '../../shared/services/worker-hours.service';

@Component({
  selector: 'app-tmp-worker-hours',
  templateUrl: './tmp-worker-hours.component.html',
  styleUrls: ['./tmp-worker-hours.component.css']
})
export class TmpWorkerHoursComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  @Input()
  workerHours: WorkerHours;

  numHoursControl: FormControl;

  //----------------CONSTRUCTOR------------------

  constructor(private workerHoursService: WorkerHoursService) {
  }

  //----------------METHODS-------------------

  ngOnInit() {
    this.numHoursControl = new FormControl(this.workerHours.numHours, stringValidatorArr("num hours", 1));
  }

  changeWorkerHours() {
    this.workerHours.numHours = this.numHoursControl.value;
    this.workerHoursService.changeWorkerHoursSubject.next(this.workerHours);
  }

  deleteWorkerHours() {
    this.workerHoursService.deleteWorkerHoursSubject.next(this.workerHours);
  }
}
