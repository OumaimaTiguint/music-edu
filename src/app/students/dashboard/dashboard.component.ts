import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lessons: Observable<any>;
  beginner = [];
  advanced = [];
  displayedLessons = this.beginner;
  b: boolean = true;
  a: boolean = false;

  constructor( 
    private lessonService: LessonsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  getBeginnerLessons() {
    console.log(this.beginner)
    this.displayedLessons = this.beginner;
    this.b = true;
    this.a = false;
  }

  getAdvancedLessons() {
    console.log(this.advanced)
    this.displayedLessons = this.advanced;
    this.a = true;
    this.b = false;
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
  }
}
