import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  FormData: FormGroup;
  constructor(
    private builder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  onSubmit(FormData) {
    console.log(FormData)
    const { Fullname, Password } = FormData;
    this.usersService.addUser(Fullname, Password)
    .subscribe(response => {
      console.log(response)
      this.router.navigate(["/s/login/"])
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    })
  }

}
