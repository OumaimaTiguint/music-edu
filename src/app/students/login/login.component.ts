import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: Observable<any>;
  FormData: FormGroup;
  id: string;
  constructor(
    private builder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  onSubmit(FormData) {
    const { Fullname, Password } = FormData;
    this.usersService.login(Fullname, Password)
    .pipe(first())
    .subscribe(
      (data: HttpResponse<any>) => {
        if(data.headers.get('token') !== null) {
          localStorage.setItem('token', data.headers.get('token'));
          this.router.navigate(["/s/dashboard/"])
        }
        const error = document.getElementById('error');
        error.innerText = "Fullname/Password is incorrect.";
        // error message styling
        error.style.backgroundColor = "red"
        error.style.color = "white"
        error.style.padding = "10px"
        error.style.borderRadius = "10px"
        error.style.fontWeight = "bold"
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

    this.data = this.usersService.getUsers()
  }

}
