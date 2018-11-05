import { Component, OnInit } from '@angular/core';
import { ManagmentService } from '../shared/services/managment.service';
import { Project } from '../shared/models/project';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  projects: Project[]=[];

  constructor(public managerService:ManagmentService) { }

  ngOnInit() {
  this.getAllProjects();
  //get all project after add ,delete 
  this.managerService.subjectProject.subscribe(v=>{
  this.getAllProjects();
   })

  }

  getAllProjects()
  {
    this.managerService.getAllProjects().subscribe(res=>{
      console.log(res);
      this.projects=res;
    });
  }

}
