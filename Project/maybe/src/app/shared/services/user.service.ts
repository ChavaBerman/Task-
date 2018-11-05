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
        let url: string = `${this.basicURL}/Users/loginByPassword`;
        let data = { UserName: email, Password: password };
        return this.http.post(url, data);

    }

    navigate(user: User) {

        //update current user by subject
        this.currentUserSubject.next(user);

        switch (user.statusObj.statusName) {
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
        let url: string = `${this.basicURL}/Users/addUser`;
        return this.http.post(url, user);
    }
    getAllowedWorkers(idTeamHead:number): Observable<any> {
        let url: string = `${this.basicURL}/Users/GetAllowedWorkers/${idTeamHead}`;
        return this.http.get(url);
    }
    getAllWorkers(): Observable<any> {
        let url: string = `${this.basicURL}/Users/GetAllWorkers`;
        return this.http.get(url);
    }
    updateWorker(user:User): Observable<any> {
        let url: string = `${this.basicURL}/Users/UpdateUser`;
        return this.http.put(url, user);
    }
    removeUser(id:number){
        let url: string = `${this.basicURL}/Users/RemoveUser/${id}`;
        return this.http.delete(url);
    }


}