import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private usersService: UsersService,
    private router: Router
  ) { }

  onSubmit(FormData) {
    console.log(FormData)
    const { Email, Password } = FormData;
    this.email = Email;
    this.password = Password;
    this.data.subscribe(value=> {
      value.map(e=> {
        if(e.email === this.email && e.password=== this.password) {
          this.router.navigate(["/s/dashboard"])
        }
        return;
      })
    })
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Password: new FormControl('', [Validators.required])
    })

    this.data = this.usersService.getUsers()
  }

}
