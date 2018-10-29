import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Global, } from '../../imports';



@Injectable()
export class PresenceHoursService {

    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT + `/presenceHours`;

    //----------------CONSTRUCTOR------------------

    constructor(private http: HttpClient) { }

    //----------------METHODS-------------------

    //GET
    getPresenceHours(): Observable<any> {
        let url: string = `${this.basicURL}/getPresenceHours`;
        return this.http.get(url);
    }
}