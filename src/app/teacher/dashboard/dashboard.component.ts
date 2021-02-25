import { LessonsService } from './../../services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lessons: Observable<any>;
  constructor(private lessonService: LessonsService) { }

  ngOnInit(): void {
    this.lessons = this.lessonService.getLessons();
  }

}
