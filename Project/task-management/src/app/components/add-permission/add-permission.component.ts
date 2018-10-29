import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectService,PermissionService, User,Project, Permission } from '../../imports';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {

    //----------------PROPERTIRS-------------------

  @Input()
  user: User;

  projects: Project[];

  projectControl: FormControl;

    //----------------CONSTRUCTOR------------------

  constructor(
    private projectService: ProjectService,
    private permissionService: PermissionService) {

    this.projectControl = new FormControl();

    this.permissionService.deletePermissionSubject.subscribe(
      (permission:Permission)=>{
        this.projects.push(permission.project);
        this.projectControl.setValue(null);
      }
    );
  }
  //----------------METHODS-------------------

  ngOnInit() {
    this.initProjectList();
  }

  initProjectList() {
    console.log(this.user);
    this.projectService.getAllProjects().subscribe(
      (projects: Project[]) => {
        let teamLeaderId:number=this.user.teamLeaderId==null?this.user.userId:this.user.teamLeaderId;
        this.projects = projects.filter(project =>
          project.teamLeaderId != teamLeaderId &&
          this.user.permissions.some(permission => permission.projectId == project.projectId)==false);
      },
      err => {
        console.log(err);
      }
    );
  }

  addPermission() {
    let permission: Permission = new Permission(0, this.user.userId, (<Project>this.projectControl.value).projectId, true);
    this.permissionService.addPemission(permission).subscribe(
      (permissionId: number) => {
        if (permissionId>0){
          permission.permissonId=permissionId;
          permission.worker=this.user;
          permission.project=<Project>this.projectControl.value;
          this.permissionService.addPermissionSubject.next(permission);
          this.projects.splice(this.projects.findIndex(project=>project.projectId==permission.projectId),1);
        }
      },
      err=>{
        console.log(err);
      }
    );
  }
}
