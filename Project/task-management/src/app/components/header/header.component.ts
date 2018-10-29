import { Component } from '@angular/core';
import { UserService, MenuItem, Global } from '../../imports';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //----------------PROPERTIRS-------------------

  menu: { name: string, routing: string }[];

  //allow access types via interpolation
  localStorage: Storage = localStorage;
  global: any = Global;
  json = JSON;

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService) {
    userService.menuSubject.subscribe(
      (menu: MenuItem[]) => {
        this.menu = menu;
      }
    )
  }
}
