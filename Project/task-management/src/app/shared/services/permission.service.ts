import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Permission,Global } from '../../imports';

@Injectable()
export class PermissionService {
    
    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT + `/permission`;
    deletePermissionSubject:Subject<Permission>;
    addPermissionSubject:Subject<Permission>;
    
    //----------------CONSTRUCTOR------------------

    constructor(private http: HttpClient) {
        this.deletePermissionSubject=new Subject<Permission>();
        this.addPermissionSubject=new Subject<Permission>();

    }

    //----------------METHODS-------------------

    //POST
    addPemission(permission:Permission): Observable<any> {
        let url: string = `${this.basicURL}/addPemission`;
        return this.http.post(url,permission);
    }

    //POST
    deletePemission(permissionId:number): Observable<any> {
        let url: string = `${this.basicURL}/deletePemission?permissionId=${permissionId}`;
        return this.http.post(url, null);
    }
}