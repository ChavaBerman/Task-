import { Project, User } from '../../imports'

export class PresenceHours {
    constructor(
        public presenceId: number,
        public workerId: number,
        public projectId: number,
        public startHour: Date,
        public endHour: Date,
        public worker?: User,
        public project?: Project
    ) { }
}