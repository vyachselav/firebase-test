import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['user-edit.component.css']
})

export class UserEditComponent implements OnInit {

  user:  User = new User();
  action: string;
  url: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.url = this.route.snapshot.url.join('');
    if (this.url !== 'create') {
      this.route.params
        .switchMap((params: Params) => this.userService.getUser(params['key']))
        .subscribe(user => this.user = user);

      if (!this.user.$key) {
        this.router.navigate(['/create']);
      }

      this.action = 'Edit';
      this.doAction = this.update;
    } else {

      this.action = 'Create';
      this.doAction = this.create;
    }
  }

  doAction() {}

  create() {
    this.user.timestamp = -Date.now();
    this.userService.createUser(this.user, {
      orderByValue: 'timestamp',
      limitToLast: 1
    });
    this.goBack();
  }

  update() {
    this.userService.updateUser(this.user, {
      orderByValue: 'timestamp',
      limitToLast: 1
    });
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/users']);
  }

/*  createDummies(num: number) {
    for (let i = 0; i < num; i++) {
      this.user = new User();
      this.user.name = 'User' + i;
      this.user.phone = 'User' + i;
      this.user.email = 'User' + i + '@' + i;
      this.create();
    }
  }*/

}
