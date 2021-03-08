import { UsersService } from './../../services/users.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  students: Observable<any>
  constructor(private userService: UsersService) { }

  delete(id) {
    this.userService.deleteUser(id).subscribe(() => console.log("user deleted"));
    window.location.reload();
  }

  ngOnInit(): void {
    this.students = this.userService.getUsers();
  }

}
