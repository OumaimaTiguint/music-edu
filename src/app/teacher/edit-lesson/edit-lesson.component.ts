import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {
  FormData: FormGroup;
  constructor(
    private builder: FormBuilder,
    private lessonsService: LessonsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit(FormData) {
    const lessonId = this.activatedRoute.snapshot.paramMap.get('id');
    const { Title, Content, Level } = FormData;
    this.lessonsService.editLesson(lessonId, Title, Content, Level)
    .subscribe(response => {
      this.router.navigate(["t/dashboard"])
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Title: new FormControl('', [Validators.required]),
      Content: new FormControl('', [Validators.required]),
      Level: new FormControl('', [Validators.required]),
    })
  }

}
