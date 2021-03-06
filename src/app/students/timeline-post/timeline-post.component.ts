import { Observable } from 'rxjs';
import { TimelineService } from './../../services/timeline.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-timeline-post',
  templateUrl: './timeline-post.component.html',
  styleUrls: ['./timeline-post.component.scss']
})
export class TimelinePostComponent implements OnInit {
  postId: string;
  loadedPost: Observable<any>
  link;
  createdAt: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private timelineService: TimelineService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.postId = paramMap.get('id');
      this.loadedPost = this.timelineService.getTimelinePostById(this.postId)
      this.loadedPost.subscribe(response => {
        const { link, createdAt } = response;
        const urlSafe: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link)
        this.link = urlSafe;
        this.createdAt = createdAt
      })
    });
  }

}
