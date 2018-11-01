import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { checkStringLength } from '../../../app/shared/validaitors/validators'
import { UserService } from '../../shared/services/user.service'
import * as sha256 from 'async-sha256'
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //----------------PROPERTIRS-------------------
  formGroup: FormGroup;
  obj: typeof Object = Object;
  hashPassword: string;

  //----------------CONSTRUCTOR------------------
  constructor(private userservice: UserService, private router: Router) {
    let formGroupConfig = {
      userName: new FormControl("", checkStringLength("name", 3, 15)),
      userPassword: new FormControl("", checkStringLength("password", 6, 10))
    };

    this.formGroup = new FormGroup(formGroupConfig);
  }

  //----------------METHODS-------------------
  async  submitLogin() {


    this.hashPassword = await sha256(this.formGroup.controls["userPassword"].value);
    this.userservice.login(this.formGroup.controls["userName"].value, this.hashPassword).subscribe((res) => {

      this.userservice.currentUserSubject.next(res);
      localStorage.setItem("user", JSON.stringify(res));
      this.userservice.navigate(res);

    }
    )
  };




}