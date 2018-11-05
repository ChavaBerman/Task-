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
export class TeamLeaderService {

  constructor(public httpClient:HttpClient) { }

  getProjectTeamLeader(teamLeaderId:number):Observable<Project[]>
  {
    return this.httpClient.get<Project[]>(Global.baseURI+"getProjectsManager/"+teamLeaderId);
  }
}
