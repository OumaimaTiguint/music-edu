import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient) { }

  getLessons() {
    return this.http.get('http://localhost:5000/l');
  }

  getLessonById(id:string) {
    return this.http.get("http://localhost:5000/l/"+ id)
  }

  addLesson(title, content, level) {
    return this.http.post("http://localhost:5000/l/add", 
      {title, content, level})
  }

  deleteLesson(id:string) {
    return this.http.delete("http://localhost:5000/l/delete/" + id)
  }

  editLesson(id, title, content, level) {
    return this.http.post("http://localhost:5000/l/update/" + id, {title, content, level})
  }
}
