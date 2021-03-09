import { AuthService } from './../../services/auth.service';
import { NotificationsService } from './../../services/notifications.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LessonsService } from 'src/app/services/lessons.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  @Input()
    urlSafe: SafeResourceUrl;
  
  sanitizedURL = [];
  loadedLesson: Observable<any>;
  title: string;
  content: string;
  level: string;
  id: string;

  lessonId: string;
  exercises: Observable<any>

  exerciseFile;
  decoded;
  name: string;
  
  constructor(
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private exerciseService: ExerciseService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  pdfClicked() {
    const action = " downloaded PDF of "
    this.notificationsService.newNotification(this.name, this.lessonId, this.title, action)
    .subscribe(res => {
      console.log(res)
    })
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
      value.exercises.map(e => {
        if(e.lessonId === this.lessonId) {
          this.exerciseFile = e.filePath
          
          //sanitize url for file preview
          this.sanitizedURL.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.exerciseFile))
          this.urlSafe = this.sanitizedURL[0]
          console.log(this.urlSafe)
        }
      })
    })

    //get user name
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.name = this.decoded.fullname
  }
}
