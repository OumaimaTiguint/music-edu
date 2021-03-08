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

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.name = this.decoded.fullname.split(" ")[0];

    //get notifications
    this.notifications =this.notificationsService.getNotifications();
  }

}
