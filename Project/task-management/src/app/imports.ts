//----------------SHARED-------------------

//models
export { User } from './shared/models/user.model';
export { Project } from './shared/models/project.model';
export { Customer } from './shared/models/customer.model';
export { Department } from './shared/models/department.model';
export { DepartmentHours } from './shared/models/department-hours.model';
export { Permission } from './shared/models/permission.model';
export { PresenceHours } from './shared/models/presense-hours.model';
export { WorkerHours } from './shared/models/worker-hours.model';
export { eStatus, eListKind } from './shared/models/enum.model';
export { MenuItem } from './shared/models/menu-item.model';

//validators
export { stringValidatorArr, numberValidatorArr, confirmPasswordValidator, DateValidatorArr } from './shared/validators/validators';

//services
export { UserService } from './shared/services/user.service';
export { ProjectService } from './shared/services/project.service';
export { DepartmentService } from './shared/services/department.service';
export { CustomerService } from './shared/services/customer.service';
export { PermissionService } from './shared/services/permission.service';
export { PresenceHoursService } from './shared/services/presence-hours.service';
export { WorkerHoursService } from './shared/services/worker-hours.service';

export { Global } from './shared/global';

//----------------COMPONENTS-------------------

export { AppComponent } from './app.component';
export { HeaderComponent } from './components/header/header.component';
export { FooterComponent } from './components/footer/footer.component';
export { MainComponent } from './components/main/main.component';
export { MenuComponent } from './components/menu/menu.component';
export { LoginComponent } from './components/login/login.component';

//----------------MANAGER SCREENS-------------------

export { ManagerComponent } from './components/manager/manager.component';
// UserManagement
export { UserManagementComponent } from './components/user-management/user-management.component';
export { UserListComponent } from './components/user-list/user-list.component';
export { UserFormComponent } from './components/user-form/user-form.component';
export { AddUserComponent } from './components/add-user/add-user.component';
export { EditUserComponent } from './components/edit-user/edit-user.component';
export { UploadImgComponent } from './components/upload-img/upload-img.component';
export { PermissionsComponent } from './components/permissions/permissions.component';
export { PermissionListComponent } from './components/permission-list/permission-list.component';
export { TmpPermissionComponent } from './components/tmp-permission/tmp-permission.component';
export { AddPermissionComponent } from './components/add-permission/add-permission.component';
// ProjectManagement
export { AddProjectComponent } from './components/add-project/add-project.component';
//TeamsManagement
export { TeamsManagementComponent } from './components/teams-management/teams-management.component';
export { TeamManagementComponent } from './components/team-management/team-management.component';

// for UserList and TeamsManagement
export { TmpUserComponent } from './components/tmp-user/tmp-user.component';
// for AddProject-add permission and TeamManagement-belong worker to team
export { SelectWorkersComponent } from './components/select-workers/select-workers.component';

//----------------TEAM-LEADER SCREENS-------------------

export { TeamLeaderComponent } from './components/team-leader/team-leader.component';
export { WorkerHoursManagementComponent } from './components/worker-hours-management/worker-hours-management.component';
export { WorkerHoursListComponent } from './components/worker-hours-list/worker-hours-list.component';
export { TmpWorkerHoursComponent } from './components/tmp-worker-hours/tmp-worker-hours.component';
export { AddWorkerHoursComponent } from './components/add-worker-hours/add-worker-hours.component';
export { WorkersHoursStatusComponent } from './components/workers-hours-status/workers-hours-status.component';

//----------------WORKER SCREENS-------------------

export { WorkerComponent } from './components/worker/worker.component';
export { HomeComponent } from './components/home/home.component';
export { SendEmailComponent } from './components/send-email/send-email.component';

export { HoursGraphComponent } from './components/hours-graph/hours-graph.component';
export { ConfirmComponent } from './components/confirm/confirm.component';
export { DatePickerComponent } from './components/date-picker/date-picker.component';

//routing
export { routing } from './app.routing';