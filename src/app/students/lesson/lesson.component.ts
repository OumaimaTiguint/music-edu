import { ExerciseService } from 'src/app/services/exercise.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  loadedLesson: Observable<any>;
  title: string;
  content: string;
  level: string;
  id: string;

  lessonId: string;
  exercises: Observable<any>

  exerciseFile;
  
  constructor(
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private exerciseService: ExerciseService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.lessonId = paramMap.get('id');
      this.loadedLesson = this.lessonsService.getLessonById(this.lessonId)
    });
    this.loadedLesson.subscribe(value => {
      const { title, content, level, _id } = value;
      this.title = title;
      this.content = content;
      this.level = level;
      this.id = _id
    })

    this.exercises = this.exerciseService.getExercises();
    this.exercises.subscribe(value=> {
      console.log(value)
      value.exercises.map(e => {
        if(e.lessonId === this.lessonId) {
          this.exerciseFile = e.filePath
        }
      })
      console.log(this.exerciseFile);
    })
  }
}
