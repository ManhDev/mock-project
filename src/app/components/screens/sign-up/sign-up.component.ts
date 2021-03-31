import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup;
  hasError: boolean;
  errEmail: boolean;
  errUserName: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  getError(nameFormControl) {
    return this.formSignUp.controls[nameFormControl]
  }

  onSubmit() {
    let user = {
      user: {
        ...this.formSignUp.value
      }
    }
    this.authService.signUp(user).subscribe(
      res => { this.authService.logUserIn(res) },

      (error: HttpErrorResponse) => {

        error.error['errors']['username'] ? this.errUserName = true : this.errUserName = false;
        error.error['errors']['email'] ? this.errEmail = true : this.errEmail = false;
        if (!this.errUserName && !this.errEmail) {
          this.hasError = false
        }
        else {
          this.hasError = true
        }

      }
    )
  }

}
