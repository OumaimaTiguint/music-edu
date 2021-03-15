import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TimelineService } from 'src/app/services/timeline.service';

@Component({
  selector: 'app-student-post',
  templateUrl: './student-post.component.html',
  styleUrls: ['./student-post.component.scss']
})
export class StudentPostComponent implements OnInit {
  postId: string;
  loadedPost: Observable<any>
  link;
  createdAt: string;
  user: Observable<any>
  name: string;
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
      this.postId = paramMap.get('id');
      this.loadedPost = this.timelineService.getTimelinePostById(this.postId)
      this.loadedPost.subscribe(response => {
        const { link, createdAt, userId } = response;
        const urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link)
        this.link = urlSafe;
        this.createdAt = createdAt;
        this.user = this.usersService.getUserById(userId);
        this.user.subscribe(e => {
          this.name = e.fullname
        })
      })
    });
  }

}
