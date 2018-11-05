import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ManagerComponent } from './manager/manager.component';
import { AddUserComponent } from './add-user/add-user.component';
import { TimerComponent } from './timer/timer.component';
import { UserService } from './shared/services/user.service';



import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";


//custom Modules
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import {
  
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';



//custom Service

//custom Component
import { AuthGuard } from './shared/auth.guard';
import { TeamLeaderComponent } from './team-leader/team-leader.component';
import { WorkerComponent } from './worker/worker.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserTemplateComponent } from './user-template/user-template.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { HourForDepartmentComponent } from './hour-for-department/hour-for-department.component';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateReportComponent } from './create-report/create-report.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ProjectForWorkerComponent } from './project-for-worker/project-for-worker.component';
import { GraphStatusHourComponent } from './graph-status-hour/graph-status-hour.component';
import { UpdateHourForProjectComponent } from './update-hour-for-project/update-hour-for-project.component';
import { AddWorkersToProjectComponent } from './add-workers-to-project/add-workers-to-project.component';
import { ProjectTemplateComponent } from './project-template/project-template.component';
import { WorkerService } from './shared/services/worker.service';
import { TeamLeaderService } from './shared/services/team-leader.service';
import { LogOutComponent } from './log-out/log-out.component';
import { CheckUserInProjectComponent } from './check-user-in-project/check-user-in-project.component';
import { ClockComponent } from './clock/clock.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ManagerComponent,
    AddUserComponent,
    TimerComponent,
    TeamLeaderComponent,
    WorkerComponent,
    EditUserComponent,
    AllUsersComponent,
    UserTemplateComponent,
    AddProjectComponent,
    HourForDepartmentComponent,
    ConfirmDialog,
    CreateReportComponent,
    AllProjectsComponent,
    SendEmailComponent,
    ProjectForWorkerComponent,
    GraphStatusHourComponent,
    UpdateHourForProjectComponent,
    AddWorkersToProjectComponent,
    ProjectTemplateComponent,
    LogOutComponent,AllProjectsComponent, CheckUserInProjectComponent, ClockComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule, // Need this module for the routing
    AppRoutingModule,Ng4LoadingSpinnerModule.forRoot(),
    MDBBootstrapModule.forRoot(),  // Import app routing module,
    MatButtonModule, MatCheckboxModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [UserService,AuthGuard,WorkerService,TeamLeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
