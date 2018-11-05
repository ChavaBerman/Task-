import { Component, OnInit } from '@angular/core';
import {ManagmentService} from '../shared/services/managment.service'

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {

  constructor(public managerService:ManagmentService) { }

  ngOnInit() {
  }

  createReport()
  {
     this.managerService.createReport().subscribe(res=>{
      var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      var blob = new Blob([(<any>res)._body], { type: contentType });
       console.log(blob);
       debugger;
       var downloadUrl= URL.createObjectURL(blob);
        window.open(downloadUrl);
       debugger;
     })
  }

}
