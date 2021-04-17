import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  notifyError = false;
  loginForm: FormGroup;
  error = false;
  isSubmit = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    })
  }

  onLogin() {
    this.isSubmit = this.loginForm.invalid
    let user = {
      user: {
        ...this.loginForm.value
      }
    }

    if (this.loginForm.valid) {
      this.authService.signIn(user).then(() => {
        this.router.navigate([''])
      })
        .catch((err) => {
          this.error = true;
          this.notifyError = true;
        })
    }

    if (this.isSubmit) {
      this.notifyError = true
    }
  }
}
