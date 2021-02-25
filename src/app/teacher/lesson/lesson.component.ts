import { LessonsService } from './../../services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  loadedLesson: Observable<any>;
  title: string;
  content: string;
  exercises: string[];
  id: string;
  constructor(
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      const lessonId = paramMap.get('id');
      console.log(lessonId)
      this.loadedLesson = this.lessonsService.getLessonById(lessonId)
    });
    this.loadedLesson.subscribe(value => {
      const {title, content, exercises, _id } = value;
      this.title = title;
      this.content = content;
      this.exercises = exercises;
      this.id = _id
    })
  }

}
