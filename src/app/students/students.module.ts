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
import { MediaComponent } from './media/media.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelinePostComponent } from './timeline-post/timeline-post.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';

@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent, 
    DashboardComponent, 
    NavbarComponent, 
    LessonComponent,
    CommentsComponent,
    MediaComponent,
    TimelineComponent,
    TimelinePostComponent,
    PostCommentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StudentsModule { }
