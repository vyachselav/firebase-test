import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  newUser: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private afterSignIn() {
    this.router.navigate(['/users']);
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signInWithGoogle() {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  signup(): void {
    this.auth.emailSignUp(this.loginForm.value['email'],
      this.loginForm.value['password'], this.loginForm.value['name'])
      .then(() => this.afterSignIn());
  }

  login(): void {
    this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password'])
      .then(() => this.afterSignIn());
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'name':['', []]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid.'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 6 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };
}
