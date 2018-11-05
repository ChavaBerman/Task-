import { Component, OnInit } from '@angular/core';
import{Project}from '../shared/models/project'
import{WorkerService}from '../shared/services/worker.service'
import{UserService}from '../shared/services/user.service'

@Component({
  selector: 'app-project-for-worker',
  templateUrl: './project-for-worker.component.html',
  styleUrls: ['./project-for-worker.component.css']
})
export class ProjectForWorkerComponent implements OnInit {

  projects:Project[]=[];
  constructor(public workerService:WorkerService,public userService:UserService) { }

  ngOnInit() {
this.workerService.getProjectsUser(this.userService.currentUser.userId).subscribe(res=>{
this.projects=res;
},err=>{console.log(err)});
  }

}
