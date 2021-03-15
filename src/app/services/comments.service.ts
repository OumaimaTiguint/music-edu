import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getAllComments() {
    return this.http.get("http://localhost:5000/c/")
  }
  addComment(lessonId, comment, user) {
    return this.http.post("http://localhost:5000/c/add/", {lessonId, comment, user})
  }
  deleteComment(id:string) {
    return this.http.delete("http://localhost:5000/c/delete/" + id);
  }
}
