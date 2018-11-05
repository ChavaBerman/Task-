import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import{createValidatorText, createValidatorNumber, validateDateEnd, createValidatorDateBegin} from '../shared/validators/user.validation'
import { Project } from '../shared/models/project';
import { ManagmentService } from '../shared/services/managment.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { DepartmentUser } from '../shared/models/departmentUser';
import { HourForDepartment } from '../shared/models/hourForDepartment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
 
  obj: typeof Object = Object;
  formGroup: any;
  user: any;
  
  router: any;
  project:Project=new Project();
  teamLeaders: User[]=[];
  departments: DepartmentUser[]=[];
 // types:string[]=["text","text","datetime","datetime","number","","",""]

  constructor(public managerService:ManagmentService,public userService: UserService) {
    let formGroupConfig = {
      projectName: new FormControl("", createValidatorText("projectName", 2, 15)),
      customerName: new FormControl("", createValidatorText("customerName", 2, 15)),
      dateBegin:new FormControl("",createValidatorDateBegin("dateBegin")),
      dateEnd: new FormControl("",),
      numHourForProject: new FormControl("",createValidatorNumber("numHourForProject", 1, 20000)),
      idManager: new FormControl(""),
      hoursForDepartment:new FormControl(),
      
    };
    this.formGroup = new FormGroup(formGroupConfig,[validateDateEnd]);
   }

  ngOnInit() {
  
    this.userService.getAllDepartments().subscribe(departments=>{
       this.departments=departments;
      console.log(this.departments);
    });

    this.managerService.getUserByDepartment("teamLeader").subscribe(res=>{
      console.log(res);
      this.teamLeaders=res;
    },err=>{
      console.log(err);
    });

  }
  
  addProject() {
    debugger;
    console.log(new Date()>this.formGroup['dateBegin']);
      if (this.formGroup.invalid) {
        return;
      }
      else {
        this.project = this.formGroup.value;
        this.project.hoursForDepartment=[];
        let numHour:HourForDepartment;
        this.departments.forEach(element => {
        numHour=new HourForDepartment();
        numHour.sumHours=Number(element["hourForDepartment"]);
        numHour.departmentId=element["id"];
        this.project.hoursForDepartment.push(numHour);

        console.log(this.project);
        this.managerService.addProject(this.project).subscribe(res=>{
        this.managerService.subjectProject.next("true");
        alert("succsess");
        },err=>{console.log("succsess")});
       });     
      }

     
    }

    numDepartment(department1:DepartmentUser)
    {
      console.log(department1 +" de");
      console.log(this.departments);
    }
}
