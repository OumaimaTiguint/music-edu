import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }

  getLessons() {
    return this.http.get('http://localhost:5000/lessons');
  }

  getLessonById(id:string) {
    return this.http.get("http://localhost:5000/lessons"+ id)
  }
}
