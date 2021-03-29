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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl()
    })
  }
  onLogin() {
    console.log(this.loginForm);

    let user = {
      user: {
        ...this.loginForm.value
      }
    }


    this.authService.signIn(user).subscribe(
      res => { this.authService.logUserIn(res) },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.error = true
      })
  }

}
