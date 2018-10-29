import { Component, OnInit } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { PresenceHoursService, PresenceHours } from '../../imports';

@Component({
  selector: 'app-workers-hours-status',
  templateUrl: './workers-hours-status.component.html',
  styleUrls: ['./workers-hours-status.component.css']
})
export class WorkersHoursStatusComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  usersPresenceHours: any[];
  currMonth: string;
  title: string;

  //----------------CONSTRUCTOR------------------

  constructor(private presenceHoursService: PresenceHoursService) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.currMonth = months[new Date().getMonth()];
    this.title = 'Presence Hours Status';
  }
  //----------------METHODS-------------------

  ngOnInit() {
    this.presenceHoursService.getPresenceHours().subscribe(
      (presenceHoursList: PresenceHours[]) => {
        let groups = asEnumerable(presenceHoursList)
          .GroupBy(x => x.workerId, x => x,
            (key, value) => {
              return {
                userId: key, presence: (<PresenceHours[]>value).map(p => {
                  return {
                    userName: p.worker.userName,
                    totalHours: (new Date(p.endHour).getTime() - new Date(p.startHour).getTime()) / 36e5
                  };
                })
              };
            }).ToArray();
        console.log(groups);
        this.usersPresenceHours = groups.map(pre => {
          return { y: asEnumerable(pre.presence).Sum(p => p.totalHours), label: pre.presence[0].userName };
        });
        console.log(this.usersPresenceHours);
      },
      err => {
        console.log(err);
      }
    )
  }

}
