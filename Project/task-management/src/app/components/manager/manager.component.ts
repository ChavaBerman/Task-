import { Component } from '@angular/core';
import { UserService, MenuItem } from '../../imports';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {

  //----------------PROPERTIRS-------------------

  menu: MenuItem[];

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService) {
    this.menu = [
      new MenuItem('Users Managment', '/taskManagement/manager/userManagement'),
      new MenuItem('Add Project', '/taskManagement/manager/projectManagement'),
      new MenuItem('Teams Management', '/taskManagement/manager/teamsManagement')
    ];

    this.userService.setMenu(this.menu);
  }
}
