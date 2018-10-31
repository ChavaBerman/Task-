import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  currentuser: JSON;

  constructor(private userservice: UserService) { }

  ngOnInit() {
    //take value from local storage 
    if (localStorage['currentuser'])
      this.currentuser = JSON.parse(localStorage.getItem('currentuser'));
  }

  logOut() {
    //log out the user
    this.userservice.logout();
  }
}
