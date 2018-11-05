import { User } from "./user";

export class Project {
    projectId: number;
    projectName: string;
    customerName: string;
    dateBegin: Date;
    dateEnd: Date;
    isFinish: boolean;
    idManager: number;
    DevHours: number;
    QAHours: number;
    UIUXHours: number;

    //-------------------------
    manager: User;
    workers:Array<User>;


}
