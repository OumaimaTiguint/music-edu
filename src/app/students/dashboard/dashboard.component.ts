import { AuthService } from './../../services/auth.service';
import { AllowAccessService } from './../../services/allow-access.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lessons: Observable<any>;
  allowedStudents: Observable<any>;
  beginner = [];
  advanced = [];
  displayedLessons = this.beginner;
  b: boolean = true;
  a: boolean = false;

  decoded;
  userId: string;

  constructor( 
    private lessonService: LessonsService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private allowAccessService: AllowAccessService,
    private authService: AuthService
  ) { }

  getBeginnerLessons() {
    this.displayedLessons = this.beginner;
    this.b = true;
    this.a = false;
  }

  getAdvancedLessons() {
    this.displayedLessons = this.advanced;
    this.a = true;
    this.b = false;
  }

  navigate(id) {
    //check if current user is allowed access
    this.allowedStudents.subscribe(response => {
      response.map(e =>{
        console.log(e.userId, this.userId)
        if(e.userId === this.userId) {
          this.router.navigate(['/s/l/', id])
        }
        window.alert("Access Denied!")
      })
    })
  }

  ngOnInit(): void {
    this.lessons = this.lessonService.getLessons();
    this.lessons.subscribe(value=> {
      value.map(e => {
        if(e.level === "Beginner") {
          this.beginner.push(e)
        }
        if(e.level === "Advanced") {
          this.advanced.push(e)
        }
      })
    })
    //get current user
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.userId = this.decoded._id
    //get all users allowed access
    this.allowedStudents = this.allowAccessService.getAllStudentsAllowedAccess();
  }
}
