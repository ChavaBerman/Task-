import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit() {
  }

  logOut()
  {
    this.userService.currentUser=null;
    localStorage.removeItem("user");
    //remove local storage
  }

}
