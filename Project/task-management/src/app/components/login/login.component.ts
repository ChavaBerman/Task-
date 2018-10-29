import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as sha256 from 'async-sha256';
import { UserService,User, eStatus, stringValidatorArr, Global  } from '../../imports';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //----------------PROPERTIRS-------------------

  loginFormGroup: FormGroup;
  isExistUser: boolean;
  hashPassword: string;
  //allow access 'Object' type via interpolation
  objectHolder: typeof Object = Object;

  //----------------CONSTRUCTOR------------------

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.isExistUser = true;
    this.initFormGroup();
  }

  //----------------METHODS-------------------

  initFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', stringValidatorArr('email', 15, 30)],
      password: ['', stringValidatorArr('password', 5, 10, /^[A-Za-z0-9]+$/)]
    });
  }

  async onSubmit() {
    this.hashPassword = await sha256(this.password.value);
    this.login();
  }

  login() {
    this.userService.login(this.email.value, this.hashPassword)
      .subscribe(
        (user: User) => {
          if (user != null) {
            //enter user to localStorage
            localStorage.setItem(Global.USER, JSON.stringify(user));
            //enter user status to localStorage
            let status: eStatus;
            if (user.isManager == true) {
              status = eStatus.MANAGER;
              this.router.navigate(['taskManagement/manager/userManagement']);
            }
            else
              if (user.teamLeaderId == null) {
                status = eStatus.TEAM_LEADER;
                this.router.navigate(['taskManagement/teamLeader/teamWorkerList']);

              }
              else {
                status = eStatus.WORKER;
                this.router.navigate(['taskManagement/worker/home']);               
              }
            localStorage.setItem(Global.STATUS, status.toString());
          }
          else
            this.isExistUser = false;
        },
        err => {
          console.log(err);
        });
  }

  keyUp() {
    this.isExistUser = true;

  }
  //----------------GETTERS-------------------

  //getters of the form group controls

  get email() {
    return this.loginFormGroup.controls['email'];
  }
  get password() {
    return this.loginFormGroup.controls['password'];
  }
}
