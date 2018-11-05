import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
   ManagerComponent,
   LoginComponent,
   UserService,
   MainComponent,
   HeaderComponent,
   FooterComponent,
   AddProjectComponent,
   AddWorkerComponent,
   EditWorkerComponent,
   ManageReportsComponent,
   ManageTeamComponent,
   SetPermissionComponent,
   ManagerHomeComponent,
   StatusService,
   ProjectService,
   TaskService
  } from './shared/imports';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    AddWorkerComponent,
    AddProjectComponent,
    SetPermissionComponent,
    EditWorkerComponent,
    ManageTeamComponent,
    ManageReportsComponent,
    ManagerHomeComponent
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,StatusService,ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
