import { User } from './../../../models/user';
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
  hasError: boolean = false;
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
      (res: User) => {
        let userMock = { user: { email: this.formSignUp.value.email, password: this.formSignUp.value.password } }
        this.authService.signIn(userMock).then(() => { this.router.navigate(['']) }).catch(err => console.log(err))
      },
      (error: HttpErrorResponse) => {
        this.hasError = true;
      }
    )

    // this.authService.signUp(user).then(() => {
    //   this.router.navigate([''])
    // }).catch(err => this.hasError = true)
  }

}
