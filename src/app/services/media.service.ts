import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }
  getAllVideos() {
    return this.http.get("http://localhost:5000/m/")
  }
  addVideo(link, path) {
    return this.http.post("http://localhost:5000/m/add", {link, path})
  }
}
