import { Component, OnInit } from '@angular/core';
import {TeamLeaderService} from '../shared/services/team-leader.service'
import {UserService} from '../shared/services/user.service'
import{Project} from '../shared/models/project'

@Component({
  selector: 'app-team-leader',
  templateUrl: './team-leader.component.html',
  styleUrls: ['./team-leader.component.css']
})
export class TeamLeaderComponent implements OnInit {

  projects:Project[]=[];
  constructor(public teamLeaderService:TeamLeaderService,public userService:UserService) { }

  ngOnInit() {
this.teamLeaderService.getProjectTeamLeader(this.userService.currentUser.userId).subscribe(res=>{
  this.projects=res;
});
  }

}
