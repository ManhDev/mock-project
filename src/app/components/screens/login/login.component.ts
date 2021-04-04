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
  loginForm: FormGroup;
  error = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(8)])
    })
  }
  onLogin() {
    let user = {
      user: {
        ...this.loginForm.value
      }
    }

    this.authService.signIn(user).then(() => {
      this.router.navigate([''])
    }).catch(err => {
      this.error = true
    })
  }
}
