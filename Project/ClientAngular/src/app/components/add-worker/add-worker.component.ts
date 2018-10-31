import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { checkStringLength ,confirmPassword,checkEmail} from '../../shared/imports';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  formGroup: FormGroup;
  obj: typeof Object = Object;
  constructor() {

    let formGroupConfig = {
      userName: new FormControl("", checkStringLength("name", 3, 15)),
      userPassword: new FormControl("", checkStringLength("password", 6, 10)),
      confirmPassword: new FormControl("", confirmPassword(this.formGroup)),
      email: new FormControl("",checkEmail()),
      department:new FormControl(""),
      managerName:new FormControl("")

    };

    this.formGroup = new FormGroup(formGroupConfig);
  }

  ngOnInit() {
  }

}
