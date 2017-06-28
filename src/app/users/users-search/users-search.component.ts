import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styles: [`
    sup{font-size:0.6em;color:#999}
  `]
})
export class UsersSearchComponent implements OnInit {

  users;
  startAt = new Subject();
  endAt = new Subject();

  lastKeyPress: number = 0;
  searched: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.searchUsers(this.startAt, this.endAt)
      .subscribe(users => this.users = users);
  }

  search($event) {
    if ($event.timeStamp - this.lastKeyPress > 200 ) {
      let q = $event.target.value;
      if (q) {
        this.searched = true;
        this.startAt.next(q);
        this.endAt.next(q + "\uf8ff");
      }
    }
    this.lastKeyPress = $event.timeStamp;
  }
}
