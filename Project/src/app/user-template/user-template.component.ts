import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/models/user';
import { ManagmentService } from '../shared/services/managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {

  @Input()
  user: User;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  constructor(public managerService:ManagmentService,public router:Router) {

   }

  ngOnInit() {
  }

  delete()
  {
    console.log(this.user.userId)
    this.deleteUser.emit(this.user.userId);
  }

  editUser()
  {
    this.managerService.userToEdit=this.user;
    this.router.navigate(["/manager/editUser"]);
  }

}
