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
  ger: string
  displayedLang: string;
  english: boolean = true;
  italian: boolean = false;
  german: boolean = false;
  
  constructor(private bioService: BioService) { }

  getEnglishBio() {
    this.displayedLang = this.eng;
    this.english = true;
    this.italian = false;
    this.german = false;
  }

  getItalianBio() {
    this.displayedLang = this.ita;
    this.italian = true;
    this.english = false;
    this.german = false;
  }

  getGermanBio() {
    this.displayedLang = this.ger;
    this.german = true;
    this.italian = false;
    this.english = false;
  }

  ngOnInit(): void {
    this.data = this.bioService.getBio()
    this.data.subscribe(value => {
      const { eng, ita, ger } = value[0];
      this.eng = eng;
      this.ita = ita;
      this.ger = ger;
      this.displayedLang = eng;
    })
  }

}
