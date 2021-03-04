import { LessonsService } from './../../services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  delete() {
    this.lessonsService.deleteLesson(this.id).subscribe(() => console.log("lesson deleted"));
    this.router.navigate(["t/dashboard"])
  }

  edit() {
    this.router.navigate(['t/l/edit', this.id])
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      const lessonId = paramMap.get('id');
      this.loadedLesson = this.lessonsService.getLessonById(lessonId)
    });
    this.loadedLesson.subscribe(value => {
      const { title, content, level, _id } = value;
      this.title = title;
      this.content = content;
      this.level = level;
      this.id = _id
      //console.log(exercises.data.data)
      //let file = new Blob(exercises.data.data, { type: 'application/pdf' });            
      //const fileURL = URL.createObjectURL(file);
      //window.open(fileURL);
    })
  }

}
