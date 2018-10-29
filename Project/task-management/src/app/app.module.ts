import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule,MatDatepickerModule,MatInputModule} from '@angular/material';

import {
  //services
  UserService,
  ProjectService,
  DepartmentService,
  CustomerService,
  PermissionService,
  WorkerHoursService,
  PresenceHoursService,
  //components
  AppComponent,
  HeaderComponent,
  FooterComponent,
  MainComponent,
  MenuComponent,
  LoginComponent,
  //Manger Screens
  ManagerComponent,
  UserManagementComponent,
  UserListComponent,
  UserFormComponent,
  AddUserComponent,
  EditUserComponent,
  UploadImgComponent,
  PermissionsComponent,
  PermissionListComponent,
  TmpPermissionComponent,
  AddPermissionComponent,
  // ProjectManagement
  AddProjectComponent,
  //TeamsManagement
  TeamsManagementComponent,
  TeamManagementComponent,
  // for UserList and TeamsManagement
  TmpUserComponent,
  // for AddProject-add permission and TeamManagement-belong worker to team
  SelectWorkersComponent,
  //TeamLeader Screens
  TeamLeaderComponent,
  WorkerHoursManagementComponent,
  WorkerHoursListComponent,
  TmpWorkerHoursComponent,
  AddWorkerHoursComponent,
  WorkersHoursStatusComponent,
  //Worker Screens
  WorkerComponent,
  HomeComponent,
  SendEmailComponent,
  HoursGraphComponent,
  ConfirmComponent,
  DatePickerComponent,
  //routing
  routing,
}
  from './imports';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MenuComponent,
    LoginComponent,
    ManagerComponent,
    UserManagementComponent,
    UserListComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    UploadImgComponent,
    PermissionsComponent,
    PermissionListComponent,
    TmpPermissionComponent,
    AddPermissionComponent,
    AddProjectComponent,
    TeamsManagementComponent,
    TeamManagementComponent,
    TmpUserComponent,
    SelectWorkersComponent,
    TeamLeaderComponent,
    WorkerHoursManagementComponent,
    WorkerHoursListComponent,
    TmpWorkerHoursComponent,
    AddWorkerHoursComponent,
    WorkersHoursStatusComponent,
    WorkerComponent,
    HomeComponent,
    SendEmailComponent,
    HoursGraphComponent,
    ConfirmComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    BootstrapModalModule.forRoot({ container: document.body }),
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  providers: [
    UserService,
    ProjectService,
    DepartmentService,
    CustomerService,
    PermissionService,
    PresenceHoursService,
    WorkerHoursService
  ],
  entryComponents: [
    ConfirmComponent,SendEmailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
