import { UsersService } from './../../services/users.service';
import { LessonsService } from './../../services/lessons.service';
import { NotificationsService } from './../../services/notifications.service';
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
  lessonTitle: string;
  user: string;
  comment: string;
  commentsById = [];
  currentUser: Observable<any>;
  lesson:Observable<any>
  constructor(
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private lessonsService: LessonsService,
    private usersService: UsersService
  ) { }

  onSubmit() {
    const { comment } = this;
    const action = " commented on "
    this.commentsService.addComment(this.lessonId, comment, this.user)
    .subscribe(response => {
      this.notificationsService.newNotification(this.user, this.lessonId, this.lessonTitle, action)
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
    this.allComments = this.commentsService.getAllComments();
    //get the lessonId
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        return;
      }
      this.lessonId = paramMap.get('id');
    });
    //get lesson title
    this.lesson = this.lessonsService.getLessonById(this.lessonId);
    this.lesson.subscribe(value=> {
      this.lessonTitle = value.title
    })
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
    this.currentUser =this.usersService.getUserById(this.decoded._id);
    this.currentUser.subscribe(response=> {
      this.user = response.username;
    })
  }

}
