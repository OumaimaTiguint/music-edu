import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonComponent } from './lesson/lesson.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';

const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "l/add", component: AddLessonComponent},
  { path: "l/:id", component: LessonComponent},
  { path: "l/edit/:id", component: EditLessonComponent},
  { path: "students", component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }