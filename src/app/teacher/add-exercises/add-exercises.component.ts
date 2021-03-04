import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from './../../models/Exercise';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.scss']
})
export class AddExercisesComponent implements OnInit {
  form: FormGroup;
  exercise: Exercise;
  exerciseData: string;
  lessonId: string;
  constructor(
    private exerciseService: ExerciseService,
    private activatedRoute: ActivatedRoute
  ) { }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: file });
    const allowedMimeTypes = ["application/pdf"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.exerciseData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log(this.lessonId, this.form.value.file)
    this.exerciseService.addExercise(this.lessonId, this.form.value.file);
    this.form.reset();
    this.exerciseData = null;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      file: new FormControl(null)
    });
    //get lessonId
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.lessonId = paramMap.get('id');
    });
  }

}
