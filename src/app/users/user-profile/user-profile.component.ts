import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [``]
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }

}
