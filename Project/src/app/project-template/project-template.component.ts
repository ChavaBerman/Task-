import { Component, OnInit,Input } from '@angular/core';
import{Project} from '../shared/models/project'
import { ManagmentService } from '../shared/services/managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent implements OnInit {

  @Input()
  project: Project;
  constructor(public managerService:ManagmentService,public router:Router) { }

  ngOnInit() {
  }

  addWorkerToProject()
  {
     this.managerService.subjectWorkerToProject.next(this.project);
     this.router.navigate(["/manager/addWorkerToProject"])
  }

  showWorker()
  {
    this.managerService.subjectProject.next(this.project);
    this.router.navigate(["/manager/userInProject"])
  }

}
