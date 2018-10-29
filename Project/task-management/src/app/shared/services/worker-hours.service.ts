import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Global, WorkerHours } from '../../imports';



@Injectable()
export class WorkerHoursService {

    //----------------PROPERTIRS-------------------

    basicURL: string = Global.BASE_ENDPOINT + `/workerHours`;
    changeWorkerHoursSubject: Subject<WorkerHours>;
    deleteWorkerHoursSubject: Subject<WorkerHours>;
    addWorkerHoursSubject: Subject<WorkerHours>;

    //----------------CONSTRUCTOR------------------

    constructor(private http: HttpClient) {
        this.changeWorkerHoursSubject = new Subject<WorkerHours>();
        this.deleteWorkerHoursSubject = new Subject<WorkerHours>();
        this.addWorkerHoursSubject = new Subject<WorkerHours>();

    }

    //----------------METHODS-------------------

    //GET
    getAllWorkerHours(workerId: number): Observable<any> {
        let url: string = `${this.basicURL}/getAllWorkerHours?workerId=${workerId}`;
        return this.http.get(url);
    }

    //POST
    addWorkersHours(workerHoursList: WorkerHours[]): Promise<any> {
        let url: string = `${this.basicURL}/addWorkersHours`;
        return this.http.post(url, workerHoursList).toPromise();
    }
    
    //PUT
    editWorkersHours(workerHoursList: WorkerHours[]): Promise<any> {
        let url: string = `${this.basicURL}/editWorkersHours`;
        return this.http.put(url, workerHoursList).toPromise();
    }

    //POST
    deleteWorkersHours(userIdList: number[]): Promise<any> {
        let url: string = `${this.basicURL}/deleteWorkersHours`;
        return this.http.post(url, userIdList).toPromise();
    }


}
