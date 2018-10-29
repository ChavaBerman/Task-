import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, User,eListKind,Global } from '../../imports';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  users: User[] = [];

  listKind:eListKind;

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.userService.updateUserListSubject.subscribe(
      () => {
        this.initUsers();
      }
    );
  }

  //----------------METHODS-------------------

  ngOnInit() {
    this.initUsers();
  }

  initUsers() {
    if (this.activatedRoute.snapshot['_routerState'].url == '/taskManagement/manager/teamsManagement') {
      this.getAllTeamLeaders();
      this.listKind = eListKind.TEAM_LEADERS;
    }
    else {
      if (this.activatedRoute.snapshot['_routerState'].url == '/taskManagement/teamLeader/teamWorkerList') {
        this.getAllTeamWorkers();
        this.listKind=eListKind.TEAM_WORKERS;
      }

      else {
        this.getAllUsers();
        this.listKind=eListKind.ALL_WORKERS;
      }
    }
  }
  
  getAllTeamLeaders() {
    this.userService.getAllTeamLeaders().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllTeamWorkers() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        let teamLeaderId:number=(<User>JSON.parse(localStorage.getItem(Global.USER))).userId;
        this.users = users.filter(user=>user.teamLeaderId==teamLeaderId);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  }

}
