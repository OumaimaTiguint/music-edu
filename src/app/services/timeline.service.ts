import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  getTimelinePosts() {
    return this.http.get("http://localhost:5000/tl/")
  }

  addTimelinePost(userId, link) {
    return this.http.post("http://localhost:5000/tl/add", { userId, link })
  }

  getTimelinePostById(id:string) {
    return this.http.get("http://localhost:5000/tl/" + id)
  }
}
