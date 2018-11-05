import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import sha256 from 'async-sha256';
import { DepartmentEnum, createValidatorNumber } from '../shared/validators/user.validation';
import { DepartmentUser } from '../shared/models/departmentUser';
import { ManagmentService } from '../shared/services/managment.service';
import{createValidatorText} from '../shared/validators/user.validation'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {

  formGroup: FormGroup;
  obj: typeof Object = Object;
  user: User;
  departments: DepartmentUser[]=[];
  userByDepartment:User[]=[];

  constructor(public userService:UserService,public managerService:ManagmentService) {

  userService.getAllDepartments().subscribe(departments=>{ this.departments=departments;
    console.log(this.departments);
  });

  let  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; 
  let formGroupConfig = {
    userName: new FormControl("", createValidatorText("userName", 2, 15)),
    password: new FormControl("", createValidatorText("password", 5, 10)),
    email:new FormControl("",createValidatorText("email", 5, 30,emailPattern)),
    numHoursWork:new FormControl("", createValidatorNumber("numHoursWork", 4, 9)),
    departmentId: new FormControl("",[Validators.required]),
    managerId:new FormControl()
  };
  this.formGroup = new FormGroup(formGroupConfig);
  }

  addUser() {
    if (this.formGroup.invalid) {
      return;
    }
    else {
      this.user = this.formGroup.value;
      console.log(this.user);
      sha256(this.user.password).then(p=>{this.user.password=p;
      this.managerService.addUser(this.user).subscribe(res=>{
        alert("add user");
      },err=>{alert("error not add user")});

      });

    }
  }

  chooseDepartment()
  {
    
   let value=this.formGroup.controls['departmentId'].value;
    if(value==DepartmentEnum.TEAMLEADER)
    {
      this.managerService.getUserByDepartment("manager").subscribe(users=>{
        console.log(users);
        this.userByDepartment=users;
      });
    }
    else if(value!=DepartmentEnum.MANAGER){
      this.managerService.getUserByDepartment("teamLeader").subscribe(users=>{
        console.log(users);
        this.userByDepartment=users;
      });
    }
    else {
      this.userByDepartment=[];
    }
  }

}
