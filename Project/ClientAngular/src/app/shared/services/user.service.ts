import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Global } from '../global';
import { Router } from "../../../../node_modules/@angular/router";
import { User } from '../imports';

@Injectable()
export class UserService {
    logout(): any {
        throw new Error("Method not implemented.");
    }
    constructor(private http: HttpClient, private router: Router) {

    }
    //----------------PROPERTIRS-------------------
    currentUserSubject = new Subject();
    basicURL: string = Global.BASE_ENDPOINT;

    login(email: string, password: string): Observable<any> {
        let url: string = `${this.basicURL}/loginByPassword`;
        let data = { UserName: email, Password: password };
        return this.http.post(url, data);

    }

    navigate(user: User) {

        //update current user by subject
        this.currentUserSubject.next(user);

        switch (user.statusObj.StatusName) {
            case 'Manager':
                this.router.navigate(['taskManagement/manager'])
                break;
            case 'TeamHead':
                this.router.navigate(['taskManagement/TeamHead'])
                break;
            default: this.router.navigate(['taskManagement/Worker'])
                break;
        }
    }

    getAllTeamHeads(): Observable<any> {
        let url: string = `${this.basicURL}/Users/GetAllTeamHeads`;
        return this.http.get(url);
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    addWorker(user:User): Observable<any> {
        let url: string = `${this.basicURL}/addUser`;
        let data = {value:user};
        return this.http.post(url, user);

    }


}