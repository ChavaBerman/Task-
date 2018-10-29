import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import * as sha256 from 'async-sha256';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService, User, ConfirmComponent } from '../../imports';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  //----------------PROPERTIRS-------------------

  user: User
  caption: string;

  //----------------CONSTRUCTOR------------------

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', null, false, 0, 0);
    this.caption = 'Add User';
  }

  //----------------METHODS-------------------

  onSubmit(data: { user: User, imageFile: string }) {
    this.user = data.user;
    //upload profile image in the server
    if (data.imageFile) {
      this.userService.uploadImageProfile(data.imageFile)
        .subscribe((newFilename: string) => {
          //placement image name to the user object
          this.user.profileImageName = newFilename;
          this.addUser();
        });
    }
    this.addUser();
  }

  async addUser() {
    this.user.password = this.user.confirmPassword = await sha256(this.user.password);
    this.userService.addUser(this.user).subscribe(
      (created: boolean) => {
        if (created) {
          this.showConfirm();
        }
      },
      err => console.log(err));
  }

  showConfirm() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: '',
      msg: `${this.user.userName} added succsesully`,
      autoClosing: true
    }).subscribe(() => {
      this.router.navigate(['taskManagement/manager/userManagement'])
    });
  }
}