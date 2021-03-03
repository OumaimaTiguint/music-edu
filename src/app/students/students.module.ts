import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LessonComponent } from './lesson/lesson.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent, 
    DashboardComponent, 
    NavbarComponent, 
    LessonComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StudentsModule { }
