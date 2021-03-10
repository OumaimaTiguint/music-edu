import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get("http://localhost:5000/u/")
  }
  addUser(fullname, email, password) {
    return this.http.post("http://localhost:5000/u/add", {fullname, email, password})
  }
  login(fullname, password) {
    return this.http.post("http://localhost:5000/u/login/", {fullname, password},
    {observe: 'response' as 'body'})
    .pipe(map(user => { return user}));
  }
  getUserById(id) {
    return this.http.get("http://localhost:5000/u/" + id)
  }
  deleteUser(id:string) {
    return this.http.delete("http://localhost:5000/u/delete/" + id)
  }
}
