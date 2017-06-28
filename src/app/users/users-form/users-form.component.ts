import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/user.service";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styles: [`.container {
    padding: 20px;
    margin: 20px;
    border: 1px solid #d3d3d3;
    box-shadow: 0 0 2px 2px #d3d3d3; }
  `]
})

export class UsersFormComponent implements OnInit {
  public data: any[];
  showLoading = true;
  fieldBy: string = 'timestamp';
  itemsPerPage: number = 4;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {}

  dataChanged(event: any) {
    this.data = event.data;
    this.showLoading = false;
  }

  loadingChanged(show: boolean) {
    this.showLoading = show;
  }

  deleteAll() {
    this.userService.deleteAll();
  }
}
