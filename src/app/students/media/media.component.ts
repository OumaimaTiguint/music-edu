import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input()
    url: string[];
    urlSafe: SafeResourceUrl[];

  sanitizedURLs = [];
  allVideos: Observable<any>
  videos = []
  constructor(
    private sanitizer: DomSanitizer,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.allVideos = this.mediaService.getAllVideos();
    this.allVideos.subscribe(response => {
      response.map(e => {
        if(e.path === "student") {
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
