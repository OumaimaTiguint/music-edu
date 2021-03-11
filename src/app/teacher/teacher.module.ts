import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { LessonComponent } from './lesson/lesson.component';
import { RouterModule } from '@angular/router';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { AddExercisesComponent } from './add-exercises/add-exercises.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { MediaComponent } from './media/media.component';


@NgModule({
  declarations: [
    LoginComponent, 
    DashboardComponent, 
    NavbarComponent, 
    AddLessonComponent, 
    LessonComponent, 
    EditLessonComponent, 
    UsersComponent, 
    CommentsComponent, 
    AddExercisesComponent, MediaComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ClickOutsideModule
  ]
})
export class TeacherModule { }
