import { Routes, RouterModule } from '@angular/router';

import {LoginComponent, 
       ManagerComponent } from './imports';

const appRoutes: Routes = [
    {
        path: 'taskManagement', children: [
            {
                path: 'login', component: LoginComponent
            },
            {
              path:'manager',component:ManagerComponent
            }
            // {
            //     path: 'manager', component: ManagerComponent, children: [

            //         {
            //             path: 'userManagement', component: UserManagementComponent, children: [
            //                 {
            //                     path: 'userList', component: UserListComponent
            //                 },
            //                 {
            //                     path: 'addUser', component: AddUserComponent
            //                 },
            //                 {
            //                     path: 'editUser/:id', component: EditUserComponent
            //                 },
            //                 {
            //                     path: 'permissions/:id', component: PermissionsComponent
            //                 },
            //                 {
            //                     path: '**', component: UserListComponent
            //                 },
            //             ]
            //         },
            //         {
            //             path: 'projectManagement', component: UserManagementComponent, children: [
            //                 {
            //                     path: 'addProject', component: AddProjectComponent
            //                 },
            //                 {
            //                     path: '**', component: AddProjectComponent
            //                 }
            //             ]
            //         },
            //         {
            //             path: 'teamsManagement', component: TeamsManagementComponent, children: [
            //                 {
            //                     path: 'teamLeaderList', component: UserListComponent
            //                 },
            //                 {
            //                     path: 'teamManagement/:teamLeaderId', component: TeamManagementComponent
            //                 },
            //                 {
            //                     path: '**', component: UserListComponent
            //                 },
            //             ]
            //         },
            //         {
            //             path: '**', component: UserManagementComponent
            //         }
            //     ]
            // },
            // {
            //     path:'teamLeader',component:TeamLeaderComponent,children:[
            //         {
            //             path:'teamWorkerList',component:UserListComponent
            //         },
            //         {
            //             path:'workerHoursManagement/:id',component:WorkerHoursManagementComponent
            //         },
            //         {
            //             path:'workersHoursStatus',component:WorkersHoursStatusComponent
            //         },
            //     ]
            // },
            // {
            //     path:'worker',component:WorkerComponent,children:[
            //         {
            //             path:'home',component:HomeComponent
            //         },
            //         {
            //             path:'**',component:HomeComponent
            //         }
            //     ]
            // }
        ]
    },
    { path: '', component: LoginComponent },
    // otherwise redirect to LoginComponent
    { path: '**', component: LoginComponent }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);