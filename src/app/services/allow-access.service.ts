import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllowAccessService {

  constructor(private http: HttpClient) { }

  getAllStudentsAllowedAccess() {
    this.http.get("http://localhost:5000/access/")
  }

  AllowAccess(user: string) {
    this.http.post("http://localhost:5000/access/add", user)
  }
}
