import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService, User,eListKind, Global, ConfirmComponent } from '../../imports';

@Component({
  selector: 'app-tmp-user',
  templateUrl: './tmp-user.component.html',
  styleUrls: ['./tmp-user.component.css']
})
export class TmpUserComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  user: User;

  @Input()
  listKind:eListKind;

  
  //allow access types via interpolation
  global: typeof Global = Global;
  eListKind:typeof eListKind=eListKind;

  //----------------CONSTRUCTOR------------------

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private userService: UserService
  ) { }

  //----------------METHODS-------------------

  edit() {
    this.router.navigate(['taskManagement/manager/userManagement/editUser', this.user.userId]);
  }

  showConfirm() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Delete Worker',
      msg: 'Are you sure you want to delete this worker?',

    })
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed)
          this.deleteUser();
      });
  }
  
  deleteUser() {
    this.userService.deleteUser(this.user.userId).subscribe(
      (deleted: boolean) => {
        if (deleted) {
          this.userService.updateUserListSubject.next();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  
  definePermissions(){
    this.router.navigate(['taskManagement/manager/userManagement/permissions',this.user.userId]);
  }

  teamManagement(){
    this.router.navigate(['taskManagement/manager/teamsManagement/teamManagement',this.user.userId]);
  }
  
  updateHours(){
    this.router.navigate(['taskManagement/teamLeader/workerHoursManagement',this.user.userId]);
  }
}
