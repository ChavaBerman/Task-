import { Component } from '@angular/core';
import { UserService, MenuItem } from '../../imports';

@Component({
  selector: 'app-team-leader',
  templateUrl: './team-leader.component.html',
  styleUrls: ['./team-leader.component.css']
})
export class TeamLeaderComponent {

  //----------------PROPERTIRS-------------------

  menu: MenuItem[];

  //----------------CONSTRUCTOR------------------

  constructor(private userService: UserService) {
    this.menu = [
      new MenuItem('Team Worker List', '/taskManagement/teamLeader/teamWorkerList'),
      new MenuItem('workers Hours Status', '/taskManagement/teamLeader/workersHoursStatus')
    ];
    userService.setMenu(this.menu);
  }

}
