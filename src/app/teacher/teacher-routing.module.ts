import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonComponent } from './lesson/lesson.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MediaComponent } from './media/media.component';

const routes: Routes = [
  { path: "", component: LoginComponent},
  { 
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "l/add", 
    component: AddLessonComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "l/:id", 
    component: LessonComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "l/edit/:id", 
    component: EditLessonComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "students", 
    component: UsersComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "media", 
    component: MediaComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }