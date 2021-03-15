import { Observable } from 'rxjs';
import { MediaService } from './../../services/media.service';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input()
    url: string[];
  defaultLink: string;
  studentLink: string
  allVideos: Observable<any>
  defaultVideos = []
  studentVideos = []
  constructor(
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) { }

  delete(id) {
    this.mediaService.deleteVideo(id)
    .subscribe(e=> {
      window.location.reload();
    })
  }

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
          this.defaultVideos.push(e)
        } else if(e.path === "student") {
          this.studentVideos.push(e)
        }
      })
      //looping through the videos array
      for(let url of this.defaultVideos) {
        const urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.link)
        url.link = urlSafe
      }

      for(let url of this.studentVideos) {
        const urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.link)
        url.link = urlSafe
      } 
    })
  }

}
