import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  teacherLogin(fullname, password) {
    return this.http.post("http://localhost:5000/t/login/", {fullname, password},
    {observe: 'response' as 'body'})
    .pipe(map(t => { return t}));
  }
}
