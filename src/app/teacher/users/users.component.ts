import { AllowAccessService } from './../../services/allow-access.service';
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
  allowed: Observable<any>
  studentIds = [];
  constructor(
    private userService: UsersService,
    private allowAccessService: AllowAccessService
  ) { }

  delete(id) {
    this.userService.deleteUser(id).subscribe(() => console.log("user deleted"));
    window.location.reload();
  }

  allowAccess(userId, fullname) {
    this.allowAccessService.AllowAccess(userId)
    .subscribe(response => {
      const confirmation = document.getElementById("confirmation")
      confirmation.innerText = fullname + ' granted access.'
      // confirmation message styling
      confirmation.style.backgroundColor = "black"
      confirmation.style.color = "white"
      confirmation.style.padding = "10px"
      confirmation.style.borderRadius = "10px"
      confirmation.style.fontWeight = "bold"
    })
  }

  denyAccess(userId, fullname) {
    this.allowed.subscribe(response => {
      response.map(e=> {
        if(e.userId === userId) {
          this.allowAccessService.DenyAccess(e._id).subscribe(res => {
            const confirmation = document.getElementById("confirmation")
            confirmation.innerText = fullname + ' denied access.'
            // confirmation message styling
            confirmation.style.backgroundColor = "red"
            confirmation.style.color = "white"
            confirmation.style.padding = "10px"
            confirmation.style.borderRadius = "10px"
            confirmation.style.fontWeight = "bold"
          })
        }
      })
    })
  }

  ngOnInit(): void {
    this.students = this.userService.getUsers();
    this.allowed = this.allowAccessService.getAllStudentsAllowedAccess();
  }

}
