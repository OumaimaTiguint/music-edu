import { Observable } from 'rxjs';
import { BioService } from './../../services/bio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  data: Observable<any>;
  eng: string
  ita: string
  displayedLang: string;
  english: boolean = true;
  italian: boolean = false;
  
  constructor(private bioService: BioService) { }

  getEnglishBio() {
    console.log(this.eng)
    this.displayedLang = this.eng;
    this.english = true;
    this.italian = false;
  }

  getItalianBio() {
    console.log(this.ita)
    this.displayedLang = this.ita;
    this.italian = true;
    this.english = false;
  }

  ngOnInit(): void {
    this.data = this.bioService.getBio()
    this.data.subscribe(value => {
      const { eng, ita } = value[0];
      this.eng = eng;
      this.ita = ita;
      this.displayedLang = eng;
    })
  }

}
