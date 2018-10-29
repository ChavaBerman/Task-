import { Component, Input } from '@angular/core';
import { UserService, eStatus, Global } from '../../imports';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  menu: { name: string, routing: string }[];

  //allow access types via interpolation
  localStorage: Storage = localStorage;
  global: typeof Global = Global;
  eStatus: typeof eStatus = eStatus;

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService) { }

  //----------------METHODS-------------------

  logout() {
    this.userService.logout();
  }
}
