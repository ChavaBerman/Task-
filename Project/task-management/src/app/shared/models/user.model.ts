import { Department, Project, WorkerHours, PresenceHours, Permission } from '../../imports';

export class User {
    constructor(
        public userId: number,
        public userName: string,
        public email: string,
        public password: string,
        public confirmPassword:string,
        public profileImageName: string,
        public isManager: boolean,
        public departmentId: number,
        public teamLeaderId: number,
        public department?: Department,
        public teamLeader?: User,
        public workers?: User[],
        public managerProjects?: Project[],
        public teamLeaderProjects?: Project[],
        public workerHours?: WorkerHours[],
        public presenceHours?: PresenceHours[],
        public permissions?: Permission[]
    ) { }
} 