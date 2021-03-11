import { Observable } from 'rxjs';
import { MediaService } from './../../services/media.service';
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
  allVideos: Observable<any>
  videos = []
  constructor(
    private sanitizer: DomSanitizer,
    private mediaService: MediaService
  ) {}

  ngOnInit() {
    this.allVideos = this.mediaService.getAllVideos();
    this.allVideos.subscribe(response => {
      response.map(e => {
        if(e.path === "default") {
          this.videos.push(e.link)
        } 
      })
      //looping through the videos array
      for(let url of this.videos) {
        //sanitizing each url and adding it to the sanitizedURLs array
        this.sanitizedURLs.push(this.sanitizer.bypassSecurityTrustResourceUrl(url)) 
      } 
      //adding sanitizedURLs content into a safeResourceUrl array
      this.urlSafe = this.sanitizedURLs
    })
  }
}
