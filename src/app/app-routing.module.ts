import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersFormComponent } from './users/users-form/users-form.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'pictures', component: UploadsListComponent, canActivate: [AuthGuard] },
  { path: 'users',  component: UsersFormComponent, canActivate: [AuthGuard] },
  { path: 'create', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'edit/:key', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
