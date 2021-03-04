import { Exercise } from './../models/Exercise';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exercises: Exercise[] = [];
  private exercises$ = new Subject<Exercise[]>();
  readonly url = "http://localhost:5000/api/exercises/";
  constructor(private http: HttpClient) { }

  getExercises() {
    return this.http.get(this.url)
  }

  getExercisesStream() {
    return this.exercises$.asObservable();
  }

  addExercise(lessonId: string, file: File): void {
    const exerciseData = new FormData();
    exerciseData.append("lessonId", lessonId);
    exerciseData.append("file", file, lessonId);
    this.http.post<{ exercise: Exercise }>(this.url, exerciseData)
      .subscribe((exerciseData) => {
        const exercise: Exercise = {
          _id: exerciseData.exercise._id,
          lessonId: lessonId,
          filePath: exerciseData.exercise.filePath,
        };
        this.exercises.push(exercise);
        this.exercises$.next(this.exercises);
      });
  }
}
