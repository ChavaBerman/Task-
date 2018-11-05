import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { LoginUser } from '../models/loginUser';
import { DepartmentUser } from '../models/departmentUser';



@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  timer=0;
  subject=new Subject();
  currentUser: User
  baseUri="http://localhost:61309/api/";
  constructor(public httpClient: HttpClient) {
  }

  signInUser(user: LoginUser): Observable<User> {
    return this.httpClient.post<User>(this.baseUri+"loginByPassword",user)
  }

  loginByUserComputer() {

  }

  logOut()
  {

  }
  getAllDepartments(): Observable<any> {
   return this.httpClient.get<any>(this.baseUri+"Department/getAllDepartments");
  }

   getAllUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(this.baseUri+"Users/getAllUsers");
  }

}
