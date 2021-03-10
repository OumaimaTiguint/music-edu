import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllowAccessService {

  constructor(private http: HttpClient) { }

  getAllStudentsAllowedAccess() {
    return this.http.get("http://localhost:5000/access/")
  }

  AllowAccess(userId: string) {
    return this.http.post("http://localhost:5000/access/add", {userId})
  }
}
