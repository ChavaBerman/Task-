import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService, User, ConfirmComponent } from '../../imports';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  userId: number;
  user: User
  caption: string;

  //----------------CONSTRUCTOR------------------

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.caption = 'Edit User';
  }

  //----------------METHODS-------------------

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => this.userId = param['id']);
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
      },
      err => console.log(err));
  }

  onSubmit(data: { user: User, imageFile: string }) {
    this.initUser(data.user);
    //remove profile image in the server
    if (this.user.profileImageName != null) {
      this.userService.removeUploadedImage(this.user.profileImageName)
        .subscribe(() => {
          this.user.profileImageName = null;
          this.uploadImage(data);
        },
          err => {
            console.log(err);
          });
    }
    else
      this.uploadImage(data);
  }

  initUser(user: User) {
    this.user.userName = user.userName;
    this.user.email = user.email;
    this.user.departmentId = user.departmentId;
    this.user.teamLeaderId = user.teamLeaderId;
  }

  uploadImage(data: { user: User, imageFile: string }) {
    //upload profile image in the server
    if (data.imageFile != null) {
      this.userService.uploadImageProfile(data.imageFile)
        .subscribe((newFilename: string) => {
          //placement image name to the user object
          this.user.profileImageName = newFilename;
          this.editUser(this.user);
        });
    }
    else
      this.editUser(this.user);
  }

  editUser(user: User) {
    this.userService.editUser(user).subscribe(
      (edited: boolean) => {
        if (edited) {
          this.showConfirm();
        }
      },
      err => console.log(err));
  }

  showConfirm() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      msg: `${this.user.userName} edited succsesully`,
      autoClosing: true
    }).subscribe(() => {
      this.router.navigate(['taskManagement/manager/userManagement'])
    });
  }
}


