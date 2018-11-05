import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { ManagmentService } from '../shared/services/managment.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[]=[];

  constructor(public userService:UserService,public managerService:ManagmentService) {

    this.getAllUsers();
   }

  ngOnInit() {
 
  }

  getAllUsers()
  {
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
      this.users=res;
    });
  }

  deleteUser(id:number)
  {
    let indexUser=this.users.findIndex(p=>p.userId==id)
    this.managerService.deleteUser(id).subscribe(res=>{
      this.users.splice( indexUser,1);
    },err=>{})
  }

}
