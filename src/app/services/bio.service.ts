import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor(private http:HttpClient) { }

  getBio() {
    return this.http.get('http://localhost:5000/b');
  }
}
