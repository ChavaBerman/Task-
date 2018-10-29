import { Component, Input } from '@angular/core';
import { WorkerHours } from '../../imports';

@Component({
  selector: 'app-worker-hours-list',
  templateUrl: './worker-hours-list.component.html',
  styleUrls: ['./worker-hours-list.component.css']
})
export class WorkerHoursListComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  workerHoursList: WorkerHours[];
}
