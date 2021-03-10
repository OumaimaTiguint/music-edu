import { NotificationsService } from './../../services/notifications.service';
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
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  onSubmit(FormData) {
    const action = " registered"
    const lessonId = "/t/students"
    const lessonTitle = '.'
    const { Fullname, Email, Password } = FormData;
    this.usersService.addUser(Fullname, Email, Password)
    .subscribe(response => {
      this.notificationsService.newNotification(Fullname, lessonId, lessonTitle, action)
      .subscribe(res => {
        console.log(res)
      })
      this.router.navigate(["/s/login/"])
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    })
  }

}
