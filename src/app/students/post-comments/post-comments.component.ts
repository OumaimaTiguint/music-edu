import { PostCommentService } from './../../services/post-comment.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';

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
  currentUser: Observable<any>;
  title: string = " a video."
  constructor(
    private postCommentService: PostCommentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private usersService: UsersService
  ) { }
  
  onSubmit() {
    const { comment } = this;
    const action = " commented on "
    this.postCommentService.addComment(this.postId, comment, this.user)
    .subscribe(response => {
      this.notificationsService.newNotification(this.user, this.postId, this.title, action)
      .subscribe(res => {
        console.log(res)
      })
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
    this.currentUser =this.usersService.getUserById(this.decoded._id);
    this.currentUser.subscribe(response=> {
      this.user = response.username;
    })
  }

}
