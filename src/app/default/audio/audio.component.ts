import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @Input()
    url: string[];
    urlSafe: SafeResourceUrl[];

  sanitizedURLs = [];

  videos = [
    "https://www.youtube.com/embed/Dr25aA-T_8A",
    "https://www.youtube.com/embed/OPw2WkFoP6o",
    "https://www.youtube.com/embed/S7QF0vtB_Ug"
  ]
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    //looping through the videos array
    for(let url of this.videos) {
      //sanitizing each url and adding it to the sanitizedURLs array
      this.sanitizedURLs.push(this.sanitizer.bypassSecurityTrustResourceUrl(url)) 
    } 
    //adding sanitizedURLs content into a safeResourceUrl array
    this.urlSafe = this.sanitizedURLs
  }
}
