import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import{Project} from '../shared/models/project'

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  constructor() { }
  @Input()
  projects: Project[];
 // @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit() {
    console.log(this.projects);
  }

}
