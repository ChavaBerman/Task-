import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';
import { FormControl, FormGroup } from '@angular/forms';
import { createValidatorText, createValidatorNumber } from '../shared/validators/user.validation';

@Component({
  selector: 'app-hour-for-department',
  templateUrl: './hour-for-department.component.html',
  styleUrls: ['./hour-for-department.component.css']
})
export class HourForDepartmentComponent implements OnInit {

  @Input() department:DepartmentUser
  formGroup: any;
 
  @Output() numDepartment: EventEmitter<DepartmentUser> = new EventEmitter<DepartmentUser>();
  
  constructor() { 
  
  }

  ngOnInit() {
    
  }

  changeNumHour()
  {
    this.numDepartment.emit(this.department) ;
  }

}
