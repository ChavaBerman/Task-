import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Global, Project } from '../../imports';



@Injectable()
export class ProjectService {

    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT + `/project`;

    //----------------CONSTRUCTOR------------------

    constructor(private http: HttpClient) { }

    //----------------METHODS-------------------

    //GET
    getAllProjects(): Observable<any> {
        let url: string = `${this.basicURL}/getAllProjects`;
        return this.http.get(url);
    }

    //POST
    addProject(project: Project): Observable<any> {
        let url: string = `${this.basicURL}/AddProject`;
        return this.http.post(url, project);
    }
}