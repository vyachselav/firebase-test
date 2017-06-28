import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';
import { UploadService } from './uploads/shared/upload.service';

import { UsersFormComponent } from './users/users-form/users-form.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserService } from './users/shared/user.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserPagerComponent } from './users/user-pager/user-pager.component';
import { UsersSearchComponent } from './users/users-search/users-search.component';

import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    UploadFormComponent,
    UploadsListComponent,
    UploadDetailComponent,
    UsersFormComponent,
    UserEditComponent,
    UserDetailComponent,
    UserPagerComponent,
    UsersSearchComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UploadService,
    UserService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
