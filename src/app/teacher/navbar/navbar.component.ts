import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  decoded;
  name: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout()
    this.router.navigate(['/t/login'])
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.name = this.decoded.fullname
  }

}
