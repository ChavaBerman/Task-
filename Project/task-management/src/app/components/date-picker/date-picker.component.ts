import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  date: FormControl;

  @Output()
  dateEvent: EventEmitter<Date>;

  //allow access 'Object' type via interpolation
  objectHolder: typeof Object = Object;

  //----------------CONSTRUCTOR------------------

  constructor() {
    this.dateEvent = new EventEmitter<Date>();
  }

  //----------------METHODS-------------------


}
