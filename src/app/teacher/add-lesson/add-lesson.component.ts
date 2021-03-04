import { LessonsService } from './../../services/lessons.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  FormData: FormGroup;
  constructor(
    private builder: FormBuilder,
    private lessonsService: LessonsService,
    private router: Router
  ) {
  }

  onSubmit(FormData) {
    console.log(FormData)
    const { Title, Content, Level} = FormData;
    this.lessonsService.addLesson(Title, Content, Level)
    .subscribe(response => {
      this.router.navigate(["/t/dashboard"])
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Title: new FormControl('', [Validators.required]),
      Content: new FormControl('', [Validators.required]),
      Level: new FormControl('', [Validators.required])
    })
  }

}
