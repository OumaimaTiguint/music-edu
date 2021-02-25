import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: Observable<any>;
  FormData: FormGroup;
  email: string;
  password: string;
  constructor(
    private builder: FormBuilder,
    private teacher: TeacherService,
    private router: Router
  ) { }
  
  onSubmit(FormData) {
    console.log(FormData)
    if(FormData.Email === this.email && FormData.Password === this.password) {
      this.router.navigate(['/teacher/dashboard']);
    } else {
      console.log("not matching");
      alert("Email or Password are incorrect!")
      return;
    }
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Password: new FormControl('', [Validators.required])
    })
    this.data = this.teacher.getTeacher();
    this.data.subscribe(value => {
      const { email, password } = value[0];
      this.email = email;
      this.password = password;
    })
  }

}
