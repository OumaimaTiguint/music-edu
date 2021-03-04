import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    public activatedRoute: ActivatedRoute
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
