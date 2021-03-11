import { Observable } from 'rxjs';
import { MediaService } from './../../services/media.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input()
    url: string[];
    defaultUrlSafe: SafeResourceUrl[];
    studentUrlSafe: SafeResourceUrl[];

  defaultSanitizedURLs = [];
  studentSanitizedURLs = [];
  defaultLink: string;
  studentLink: string;
  allVideos: Observable<any>
  defaultVideos = []
  studentVideos = []
  constructor(
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) { }

  onSubmitDefault() {
    const path = "default"
    const { defaultLink } = this;
    this.mediaService.addVideo(defaultLink, path)
    .subscribe(response => {
      window.location.reload();
    }, error => {
      console.log({ error })
    })
  }

  onSubmitStudent() {
    const path = "student"
    const { studentLink } = this;
    this.mediaService.addVideo(studentLink, path)
    .subscribe(response => {
      window.location.reload();
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    this.allVideos = this.mediaService.getAllVideos();
    this.allVideos.subscribe(response => {
      response.map(e => {
        if(e.path === "default") {
          this.defaultVideos.push(e.link)
        } else if(e.path === "student") {
          this.studentVideos.push(e.link)
        }
      })
      //looping through the videos array
      for(let url of this.defaultVideos) {
        //sanitizing each url and adding it to the sanitizedURLs array
        this.defaultSanitizedURLs.push(this.sanitizer.bypassSecurityTrustResourceUrl(url)) 
      } 
      //adding sanitizedURLs content into a safeResourceUrl array
      this.defaultUrlSafe = this.defaultSanitizedURLs

      for(let url of this.studentVideos) {
        this.studentSanitizedURLs.push(this.sanitizer.bypassSecurityTrustResourceUrl(url)) 
      } 
      this.studentUrlSafe = this.studentSanitizedURLs
    })
  }

}
