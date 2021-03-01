import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  loadedLesson: Observable<any>;
  title: string;
  content: string;
  exercises: string;
  level: string;
  id: string;
  constructor(
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      const lessonId = paramMap.get('id');
      this.loadedLesson = this.lessonsService.getLessonById(lessonId)
    });
    this.loadedLesson.subscribe(value => {
      const { title, content, level, exercises, _id } = value;
      this.title = title;
      this.content = content;
      this.level = level;
      this.exercises = exercises;
      this.id = _id
    })
  }

}
