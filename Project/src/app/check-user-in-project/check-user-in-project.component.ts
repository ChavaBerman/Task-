import { Component, OnInit } from '@angular/core';
import { ManagmentService } from '../shared/services/managment.service';
import { Project } from '../shared/models/project';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-check-user-in-project',
  templateUrl: './check-user-in-project.component.html',
  styleUrls: ['./check-user-in-project.component.css']
})
export class CheckUserInProjectComponent implements OnInit {
  
  project: Project;
  workers:User[];

  constructor(public managerService:ManagmentService) { }

  ngOnInit() {
    this.managerService.subjectProject.subscribe((v:Project)=>{
      debugger;
      this.project=v;
      this.managerService.getWorkerInProject(this.project.projectId).subscribe(res=>{
        this.workers=res;
      })
    })
  }

}
