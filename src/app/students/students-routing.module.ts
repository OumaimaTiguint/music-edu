import { AuthGuardService } from './../services/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { MediaComponent } from './media/media.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinePostComponent } from './timeline-post/timeline-post.component';


const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { 
    path: "dashboard", 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "l/:id", 
    component: LessonComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "edu-videos", 
    component: MediaComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "timeline", 
    component: TimelineComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "timeline/:id", 
    component: TimelinePostComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }