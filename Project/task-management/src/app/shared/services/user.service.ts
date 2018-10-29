import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Global, User, MenuItem } from '../../imports';

@Injectable()
export class UserService {

    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT + `/user`;
    updateUserListSubject: Subject<void>;
    resetPermissionSubject: Subject<void>;
    menuSubject: Subject<MenuItem[]>;
    //----------------CONSTRUCTOR------------------

    constructor(private http: HttpClient) {
        this.updateUserListSubject = new Subject<void>();
        this.resetPermissionSubject = new Subject<void>();
        this.menuSubject = new Subject<MenuItem[]>();
    }

    //----------------METHODS-------------------

    //POST
    login(email: string, password: string): Observable<any> {
        let url: string = `${this.basicURL}/login`;
        let data = { email: email, password: password };
        return this.http.post(url, data);
    }

    //GET
    getAllUsers(): Observable<any> {
        let url: string = `${this.basicURL}/getAllUsers`;
        return this.http.get(url);
    }
    //GET
    getAllTeamLeaders(): Observable<any> {
        let url: string = `${this.basicURL}/getAllTeamLeaders`;
        return this.http.get(url);
    }

    //GET
    getUserById(userId: number): Observable<any> {
        let url: string = `${this.basicURL}/getUserById?userId=${userId}`;
        return this.http.get(url);
    }

    //POST
    addUser(user: User): Observable<any> {
        let url: string = `${this.basicURL}/addUser`;
        return this.http.post(url, user);
    }

    //PUT
    editUser(user: User): Observable<any> {
        let url: string = `${this.basicURL}/editUser`;
        return this.http.put(url, user);
    }

    //POST
    deleteUser(userId: number): Observable<any> {
        let url: string = `${this.basicURL}/deleteUser?userId=${userId}`;
        return this.http.post(url, null);
    }

    //POST
    uploadImageProfile(image: any): Observable<any> {
        let url: string = `${this.basicURL}/uploadImageProfile`;
        let formData: FormData = new FormData();
        formData.append('file', image, image.name);
        return this.http.post(url, formData);
    }

    //POST
    removeUploadedImage(profileImageName: string): Observable<any> {
        let url: string = this.basicURL + `/removeUploadedImage`;
        let formData: FormData = new FormData();
        formData.append('profileImageName', profileImageName);
        return this.http.post(url, formData);
    }

    //POST
    sendEmail(subject:string,message:string): Observable<any> {
        let url: string = this.basicURL + `/sendEmail`;
        let formData: FormData = new FormData();
        formData.append('email',(<User>JSON.parse(localStorage.getItem(Global.USER))).email);
        formData.append('subject',subject);
        formData.append('body', message);
        return this.http.post(url, formData);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(Global.USER);
        localStorage.removeItem(Global.STATUS);
        this.setMenu(null);
    }
    setMenu(menu: MenuItem[]) {
        this.menuSubject.next(menu);
    }
}