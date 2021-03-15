import { UsersService } from './../../services/users.service';
import { Observable } from 'rxjs';
import { TimelineService } from './../../services/timeline.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-student-wall',
  templateUrl: './student-wall.component.html',
  styleUrls: ['./student-wall.component.scss']
})
export class StudentWallComponent implements OnInit {
  loadedPosts:Observable<any>
  currentUser:Observable<any>
  userId: string;
  user: string;
  videos = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private timelineService: TimelineService,
    private sanitizer: DomSanitizer,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.userId = paramMap.get('id');
      this.currentUser = this.usersService.getUserById(this.userId);
      this.currentUser.subscribe(response => {
        this.user = response.fullname
      })
      this.loadedPosts = this.timelineService.getTimelinePosts()
    });
    this.loadedPosts.subscribe(response => {
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
    console.log(this.videos)
  }

}
