import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { DepartmentUser } from '../shared/models/departmentUser';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { createValidatorNumber, createValidatorText } from '../shared/validators/user.validation';
import { User } from '../shared/models/user';
import { ManagmentService } from '../shared/services/managment.service';
import sha256 from 'async-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

 
  departments: DepartmentUser[]=[];
  formGroup: FormGroup;
  user: User;
  obj: typeof Object = Object;


  constructor(public userService: UserService,public managerService:ManagmentService,public router:Router) {

    userService.getAllDepartments().subscribe(departments=>{
       this.departments=departments;
      console.log(this.departments);
    });
    this.user=this.managerService.userToEdit;

    let  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; 
    
    let formGroupConfig = {

      userName: new FormControl(this.user.userName, createValidatorText("userName", 2, 15)),
      email:new FormControl(this.user.email,createValidatorText("email", 8, 30,emailPattern)),
      numHoursWork:new FormControl(this.user.numHoursWork, createValidatorNumber("numHoursWork", 4, 9)),
    };
    this.formGroup = new FormGroup(formGroupConfig);

    
   }

  ngOnInit() {
  
  }

  saveChangeUser()
  {
    this.user.userName  =this.formGroup.value["userName"];
    this.user.email=this.formGroup.value["email"];
    this.user.numHoursWork=this.formGroup.value["numHoursWork"];
    sha256("password").then(p=>{this.user.password=p;
    this.managerService.updateUser(this.user).subscribe(res=>{
     this.router.navigate(["/manager/allUsers"]);
    },err=>{
         console.log(err.error);//aray of error
    })
  })
  }

}
