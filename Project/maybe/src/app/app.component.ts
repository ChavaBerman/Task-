import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/imports';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientAngular';
constructor(private userservice:UserService){

}


ngOnInit()
{

if(localStorage.getItem("user")!=null)
this.userservice.navigate(JSON.parse(localStorage.getItem("user")));
//TODO

}
}
