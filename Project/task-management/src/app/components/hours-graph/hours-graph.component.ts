import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';

@Component({
  selector: 'app-hours-graph',
  templateUrl: './hours-graph.component.html',
  styleUrls: ['./hours-graph.component.css']
})
export class HoursGraphComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  @Input()
  dataPoints: { y: number, label: string }[];

  @Input()
  title: string;

  //----------------METHODS-------------------

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: this.title
      },
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
  }
}
