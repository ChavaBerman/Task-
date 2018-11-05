import { Component, OnInit } from '@angular/core';
import{Project} from '../shared/models/project'
import {WorkerService} from '../shared/services/worker.service'
import {UserService} from '../shared/services/user.service'

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  projectsWorker:Project[];

  constructor(public workerService:WorkerService,public userService:UserService) { }

  ngOnInit() {
    this.workerService.getProjectsUser(this.userService.currentUser.userId).subscribe(res=>{
       this.projectsWorker=res;
    })
  }

}
