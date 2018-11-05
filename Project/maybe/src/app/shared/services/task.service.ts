import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Global } from '../global';
import { Router } from "../../../../node_modules/@angular/router";
import { Task } from '../imports';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient, private router: Router) {

  }
  basicURL: string = Global.BASE_ENDPOINT;
  addTask(task: Task): Observable<any> {
    let url: string = `${this.basicURL}/Tasks/AddTask`;
    return this.http.post(url, task);
  }
}
