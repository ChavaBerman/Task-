import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { WorkerService } from '../shared/services/worker.service';
import { PresentDay } from '../shared/models/pressentDay';
import { UserService } from '../shared/services/user.service';




@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  ticks = 0;
    
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;
  pressantDay:PresentDay=new PresentDay();
  sub: Subscription;
  timer:any;

  constructor(public workerService:WorkerService,public userService:UserService) {
 
  }


  startTimer() {
    this.timer=  setInterval(()=>this.getTimer(),1000);
  }

    getTimer(): any {
        this.ticks ++;
        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
    }


  stopTimer()
  {
      this.pressantDay.timeEnd=new Date();
      this.pressantDay.userId=this.userService.currentUser.userId;
     
      clearInterval(this.timer);
      this.workerService.updateDayPressent(this.pressantDay).subscribe(res=>{
          alert("add present");
         this.ticks=-1; 
         this.getTimer();
      });
  }


  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
       return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
      return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) { 
      return digit <= 9 ? '0' + digit : digit;
  }

}
