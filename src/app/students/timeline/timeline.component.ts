import { NotificationsService } from './../../services/notifications.service';
import { TimelineService } from './../../services/timeline.service';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  link: string;
  @Input()
    url: string[];
    urlSafe: SafeResourceUrl[];

  allVideos: Observable<any>
  videos = []
  datetime = []
  decoded;
  userId: string;
  name: string;
  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private timelineService: TimelineService,
    private notificationsService: NotificationsService,
  ) { }

  onSubmit() {
    const { link } = this;
    const title = '.'
    const action = " posted a new video"
    this.timelineService.addTimelinePost(this.userId, link)
    .subscribe(response => {
      console.log(response)
      this.notificationsService.newNotification(this.name, this.userId, title, action)
      .subscribe(res => {
        console.log(res)
      })
      window.location.reload();
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.userId = this.decoded._id
    this.name = this.decoded.fullname

    this.allVideos = this.timelineService.getTimelinePosts();
    this.allVideos.subscribe(response => {
      response.map(e => {
        if(e.userId === this.userId) {
          this.videos.push(e)
        } 
      })
      for(let url of this.videos) {
        const urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.link)
        url.link = urlSafe
      } 
  })
}
}
