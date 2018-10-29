import { Component } from '@angular/core';
import { MenuItem, UserService } from '../../imports';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {

  //----------------PROPERTIRS-------------------

  menu: MenuItem[];

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService) {
    this.menu = [
      new MenuItem('home', '/taskManagement/worker/home')
    ];
    userService.setMenu(this.menu);
  }
}
