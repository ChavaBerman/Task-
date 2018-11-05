import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PresentDay } from '../models/pressentDay';
import { SendEmail } from '../models/sendEmail';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
 

  constructor(public httpClient:HttpClient) { }
  
  updateDayPressent(pressentDay:PresentDay): Observable<any> {
      return this.httpClient.put(Global.baseURI+"updatePresentDay",pressentDay)
    }

  sendEmail(message: SendEmail,userId:number=1): Observable<any> {
   return this.httpClient.put(Global.baseURI+"sendMessageToManagers/"+userId,message );
  }

  getHoursForUserProjects(userId: number): Observable<any> {
    //TODO:לשנות את הניתוב
      return this.httpClient.get(Global.baseURI+"getSumHoursDoneForUsers/"+userId);
  }

  getProjectsUser(userId):Observable<Project[]>
  {
     return this.httpClient.get<Project[]>(Global.baseURI+"getProjectsById/"+userId);
  }
 
}
