import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get("http://localhost:5000/u")
  }
  addUser(fullname, password) {
    return this.http.post("http://localhost:5000/u/add", {fullname, password})
  }
  login(fullname, password) {
    this.http.post("http://localhost:5000/login/", {fullname, password});
  }
}
