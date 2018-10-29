import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Global } from '../../imports';



@Injectable()
export class DepartmentService {
    
    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT + `/department`;

    //----------------CONSTRUCTOR------------------

    constructor(private http: HttpClient) { }

    //----------------METHODS-------------------
    
    //GET
    getAllDepartments(): Promise<any> {
        let url: string = `${this.basicURL}/getAllDepartments`;
        return this.http.get(url).toPromise();
    }


}