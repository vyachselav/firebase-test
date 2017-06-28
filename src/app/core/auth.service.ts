import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserDisplayName(): string {
    return this.authState['displayName'] || 'User without a Name';
  }

  get currentUserEmail(): string {
    return this.authState['email'] || 'no email';
  }

  // Google
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        this.authState = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  // Email/Pass
  emailSignUp(email:string, password:string, name:string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData(name);
      })
      .catch(error => console.log(error));
  }

  emailLogin(email:string, password:string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  // Sign Out
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  // Update DB, displayName
  private updateUserData(name: string = this.authState.displayName): void {
    this.authState.updateProfile({
      displayName: name
    });
    let path = `users/${this.currentUserId}`;
    let data = {
      email: this.authState.email,
      name: name
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }




}
