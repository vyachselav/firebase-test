import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-user-detail]',
  templateUrl: './user-detail.component.html',
  styles: ['']
})

export class UserDetailComponent implements OnInit {

  @Input() userDetail: User;

  dateObj: Date = new Date();
  dateOutput: string = '';
  timeOutput: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userDetail.timestamp) {
      this.userDetail.timestamp *= -1;
      this.dateObj.setTime(this.userDetail.timestamp);

      this.dateOutput = this.dateObj.getFullYear() + '.' +
        this.check(this.dateObj.getMonth() + 1) + '.' +
        this.check(this.dateObj.getDate());

      this.timeOutput = this.check(this.dateObj.getHours()) + ':' +
        this.check(this.dateObj.getMinutes()) + ':' +
        this.check(this.dateObj.getSeconds());
    }
}

  check(num: number): string {
    return (num >= 10) ? '' + num : '0' + num;
  }

  deleteUser() {
    this.userService.deleteUser(this.userDetail.$key);
  }

  editUser() {
    this.router.navigate(['/edit', this.userDetail.$key]);
  }
}
