import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { SendEmail } from '../shared/models/sendEmail';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  isSend:boolean=false;
  message:SendEmail=new SendEmail();
  constructor(public workerService:WorkerService,public userService:UserService) { }

  ngOnInit() {
  }

  enableSend()
  {
    this.isSend=true;
  }

  sendEmail()
  {
  
    this.workerService.sendEmail(this.message,this.userService.currentUser.userId).subscribe(
      res=>{
        alert("message send")
      }
    );
  }

}
