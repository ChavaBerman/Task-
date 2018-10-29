import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import {
  WorkerHoursService, PresenceHoursService, UserService,
  WorkerHours, PresenceHours, User,
  Global, SendEmailComponent
} from '../../imports';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  workerHours: WorkerHours[] = [];
  presenceHours: PresenceHours[] = [];

  //----------------CONSTRUCTOR------------------

  constructor(
    private workerHoursService: WorkerHoursService,
    private presenceHoursService: PresenceHoursService,
    private dialogService: DialogService,
    private userService: UserService) { }

  //----------------METHODS-------------------

  ngOnInit() {
    let workerId: number = (<User>JSON.parse(localStorage.getItem(Global.USER))).userId;
    this.workerHoursService.getAllWorkerHours(workerId).subscribe(
      (workerHours: WorkerHours[]) => {
        this.workerHours = workerHours;
      },
      err => {
        console.log(err);
      }
    )
  }
  sendEmail() {
    this.dialogService.addDialog(SendEmailComponent, {
    }).subscribe((data: { subject: string, message: string }) => {
      this.userService.sendEmail(data.subject, data.message).subscribe(
        (sended: boolean) => {
          alert(sended);
        },
        err => {
          console.log(err);
        }
      )
    });
  }
}
