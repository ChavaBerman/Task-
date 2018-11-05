import { Component, OnInit } from '@angular/core';
import { ManagmentService } from '../shared/services/managment.service';
import { Project } from '../shared/models/project';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-add-workers-to-project',
  templateUrl: './add-workers-to-project.component.html',
  styleUrls: ['./add-workers-to-project.component.css']
})
export class AddWorkersToProjectComponent implements OnInit {

  project:Project;

  workesNotinProject:User[]=[];
  addWorker:User[]=[];
  constructor(public managerService:ManagmentService) { }

  ngOnInit() {


    this.managerService.subjectWorkerToProject.subscribe((project:Project)=>{
        this.project=project;
        this.managerService.getWorkerNotInProject(project.projectId).subscribe(res=>{
          console.log(res);
          this.workesNotinProject=res;
        })
    })

  }
  changeWorker(worker:User)
  {
      let indexWorker=this.addWorker.indexOf(worker);
     if(indexWorker==-1) 
       {
       this.addWorker.push(worker);
       }
     else this.addWorker.splice(indexWorker,1);
  }

  saveChange()
  {
    this.managerService.addWorkersToProject(this.project.projectId,this.workesNotinProject).subscribe(res=>{
alert("seccsess");
    },err=>{

    });
  }


}
