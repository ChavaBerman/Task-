import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AppComponent } from "./app.component";
import { ManagerComponent } from "./manager/manager.component";
import { AuthGuard } from "./shared/auth.guard";
import { WorkerComponent } from "./worker/worker.component";
import { TeamLeaderComponent } from "./team-leader/team-leader.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { AddProjectComponent } from "./add-project/add-project.component";
import { AddWorkersToProjectComponent } from "./add-workers-to-project/add-workers-to-project.component";
import { CheckUserInProjectComponent } from "./check-user-in-project/check-user-in-project.component";



const appRoutes: Routes = [
    {path: "home", component: SignInComponent },
    {path: "", component: ManagerComponent },
    {path:'manager',component: ManagerComponent,children:[
          {path:'addUser',component: AddUserComponent,canActivate:[AuthGuard]},
          {path:'allUsers',component: AllUsersComponent},
          {path:'editUser',component: EditUserComponent},
          {path:'addProject',component: AddProjectComponent},
          {path:'addWorkerToProject',component: AddWorkersToProjectComponent},
          {path:'userInProject',component: CheckUserInProjectComponent}
    ]},
    {path:'worker',component: WorkerComponent,canActivate:[AuthGuard]},
    {path:'teamLeader',component: TeamLeaderComponent,canActivate:[AuthGuard]},
  

];

const appRouter = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [appRouter]
})
export class AppRoutingModule { }