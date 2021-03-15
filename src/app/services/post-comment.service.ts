import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {

  constructor(private http:HttpClient) { }

  getAllComments() {
    return this.http.get("http://localhost:5000/pc/")
  }
  addComment(postId, comment, user) {
    return this.http.post("http://localhost:5000/pc/add/", {postId, comment, user})
  }
  deleteComment(id:string) {
    return this.http.delete("http://localhost:5000/pc/delete/" + id);
  }
}
