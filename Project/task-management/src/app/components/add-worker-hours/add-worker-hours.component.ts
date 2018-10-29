import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  WorkerHoursService, ProjectService,
  WorkerHours, Project, User,
  Global, stringValidatorArr
} from '../../imports';

@Component({
  selector: 'app-add-worker-hours',
  templateUrl: './add-worker-hours.component.html',
  styleUrls: ['./add-worker-hours.component.css']
})
export class AddWorkerHoursComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  @Input()
  workerHoursList: WorkerHours[];

  workerHoursFormGroup: FormGroup;
  projects: Project[];

  //allow access 'Object' type via interpolation
  objectHolder: typeof Object = Object;

  //----------------CONSTRUCTOR------------------

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private workerHoursService: WorkerHoursService
  ) {
    workerHoursService.deleteWorkerHoursSubject.subscribe(
      (workerHours: WorkerHours) => {
        let project: Project = new Project(workerHours.projectId, workerHours.project.projectName, 0, 0, 0, 0, null, null);
        this.projects.push(project);
      }
    )
  }

  //----------------METHODS-------------------

  ngOnInit() {
    this.initFormGroup();
    this.initPojects();
  }

  initFormGroup() {
    this.workerHoursFormGroup = this.formBuilder.group({
      project: ['', stringValidatorArr('project')],
      numHours: ['', stringValidatorArr('num hours', 0)]
    });
  }

  initPojects() {
    //take projects of current teamLeader that the worker didn't get hours for this projects
    let teamLeaderId: number = (<User>JSON.parse(localStorage.getItem(Global.USER))).userId;
    this.projectService.getAllProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects.filter(project => project.teamLeaderId == teamLeaderId &&
          this.workerHoursList.some(w => w.projectId == project.projectId) == false)
      }
    );
  }

  onSubmit() {
    let workerHours: WorkerHours = this.workerHoursFormGroup.value;
    workerHours.projectId = workerHours.project.projectId;
    console.log(workerHours);
    this.workerHoursService.addWorkerHoursSubject.next(workerHours);
    let index: number = this.projects.findIndex(p => p.projectId == (<Project>this.project.value).projectId);
    this.projects.splice(index, 1);
    this.workerHoursFormGroup.reset();
  }

  //----------------GETTERS-------------------

  //getters of the form group controls

  get project() {
    return this.workerHoursFormGroup.controls['project'];
  }

  get numHours() {
    return this.workerHoursFormGroup.controls['numHours'];
  }
}
