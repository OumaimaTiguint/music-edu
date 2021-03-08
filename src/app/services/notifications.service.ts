import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get("http://localhost:5000/n")
  }

  newNotification(user, lessonId, lessonTitle) {
    return this.http.post("http://localhost:5000/n/add", {user, lessonId, lessonTitle})
  }
}
