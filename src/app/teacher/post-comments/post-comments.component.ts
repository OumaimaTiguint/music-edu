import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PostCommentService } from 'src/app/services/post-comment.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  allComments: Observable<any>
  decoded;
  postId: string;
  user: string;
  comment: string;
  commentsById = [];
  title: string = " a video."
  constructor(
    private postCommentService: PostCommentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  //delete comment 
  delete(id) {
    this.postCommentService.deleteComment(id).subscribe(res => {
      window.location.reload();
    })
  }

  onSubmit() {
    const { comment } = this;
    this.postCommentService.addComment(this.postId, comment, this.user)
    .subscribe(response => {
      window.location.reload();
    }, error => {
      console.log({ error })
    })
  }

  ngOnInit(): void {
    //get list of all comments
    this.allComments = this.postCommentService.getAllComments();
    //get the postId
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.postId = paramMap.get('id');
    });
    // get only comments who have the lessonId that we have
    this.allComments.subscribe(value => {
      console.log(value)
      value.map(e => {
        if(e.postId === this.postId) {
          this.commentsById.push(e)
        }
      })
    })
    //get the user name
    const token = localStorage.getItem('token')
    this.decoded = this.authService.getDecodedAccessToken(token)
    this.user =this.decoded.fullname;
  }

}
