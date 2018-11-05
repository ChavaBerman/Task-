import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Global } from './global';


@Injectable({
  providedIn: 'root'
})
export class ManagmentService {
 
 
  
 
  
  userToEdit: User;
  subjectAllUsers= new Subject();
  subjectWorkerToProject=new Subject();
  subjectProject=new Subject();
  constructor(public httpClient: HttpClient) { }

  baseUri:string="http://localhost:61309/api/"

  getUserByDepartment(idDepertmant:string): Observable<User[]> {
      return this.httpClient.get<User[]>(this.baseUri+"Users/getUsersByDepartment/"+idDepertmant)
  } 
  
  addUser(user: User): Observable<any> {
    return this.httpClient.post(this.baseUri+"addUser",user);
  }

   updateUser(user: User): Observable<any> {   
     console.log("update");
   return this.httpClient.put(this.baseUri+"updateUser",user);
  }
  
  deleteUser(idUser: number): Observable<any> {
        return this.httpClient.delete(this.baseUri+"deleteUser/"+idUser);
    }
  createReport(): Observable<any> {
    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
    headers.append('responseType', 'arrayBuffer');
     return this.httpClient.get(this.baseUri+"createReport");
    }
    
  addProject(project: Project): Observable<any> {
    return this.httpClient.post(Global.baseURI+"Projects",project);
  }
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(Global.baseURI+"getAllProjects");
  }

  getWorkerNotInProject(projectId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerNotProject/"+projectId);
  }

  addWorkersToProject(projectId:number,workers:User[]):Observable<any>
  {
    console.log(workers);
  return this.httpClient.put(Global.baseURI+"addWorkersToProject/"+projectId,workers);
  }

  getWorkerInProject(projectId:number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerInProject/"+projectId)
  }
}
