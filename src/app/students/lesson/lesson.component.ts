import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {saveAs} from 'file-saver';
import { FilesService } from 'src/app/services/files.service';


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
    private activatedRoute: ActivatedRoute
  ) {
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
    })
  }

}
