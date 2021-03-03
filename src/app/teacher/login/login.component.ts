import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  FormData: FormGroup;
  constructor(
    private builder: FormBuilder,
    private teacher: TeacherService,
    private router: Router
  ) { }
  
  onSubmit(FormData) {
    console.log(FormData)
    const { Fullname, Password } = FormData;
    this.teacher.teacherLogin(Fullname, Password)
    .pipe(first())
    .subscribe(
      (data: HttpResponse<any>) => {
        console.log(data.headers.get('token'));
        localStorage.setItem('token', data.headers.get('token'));
        this.router.navigate(["/t/dashboard/"])
      },error => {
        console.log(error)
      }
    );
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    })
  }

}
