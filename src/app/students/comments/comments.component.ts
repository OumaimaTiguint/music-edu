import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  allComments: Observable<any>
  decoded;
  lessonId: string;
  user: string;
  comment: string;
  commentsById = [];
  constructor(
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  onSubmit() {
    const { comment } = this;
    this.commentsService.addComment(this.lessonId, comment, this.user)
    .subscribe(response => {
      window.location.reload();
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    //get list of all comments
    this.allComments = this.commentsService.getAllComments();
    //get the lessonId
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.lessonId = paramMap.get('id');
    });
    // get only comments who have the lessonId that we have
    this.allComments.subscribe(value => {
      value.map(e => {
        if(e.lessonId === this.lessonId) {
          this.commentsById.push(e)
        }
      })
    })

    //get the user name
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.user = this.decoded.fullname
  }

}
