import { NotificationsService } from './../../services/notifications.service';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNotification: boolean; 
  decoded;
  name: string;
  notifications: Observable<any>
  num: number;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  logout() {
    this.authService.logout()
    this.router.navigate(['/t/login'])
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }

  delete(lessonId, id) {
    this.notificationsService.deleteNotification(id).subscribe(() => console.log("notification deleted"));
    this.router.navigate(["/t/l", lessonId])
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.name = this.decoded.fullname.split(" ")[0];

    //get notifications
    this.notifications = this.notificationsService.getNotifications();
    this.notifications.subscribe(e => {
      this.num = e.length
    })
  }

}
