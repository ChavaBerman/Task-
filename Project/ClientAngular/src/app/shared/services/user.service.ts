import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Global} from '../global';
import { Router } from "../../../../node_modules/@angular/router";
import{User} from '../../imports';

@Injectable()
export class UserService {
constructor(private http:HttpClient,private router:Router){

}
    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT;

    login(email: string, password: string): Observable<any> {
        let url: string = `${this.basicURL}/loginByPassword`;
        let data = { UserName: email, Password: password };
        return this.http.post(url, data);
        
    }

    navigate(user:User){
        switch (user.statusObj.statusName) {
            case 'Manager':
                this.router.navigate(['taskManagement/Manager'])
                break;
                case 'TeamHead':
                this.router.navigate(['taskManagement/TeamHead'])
                break;
            default:this.router.navigate(['taskManagement/Worker'])
                break;
        }
    }
    
}