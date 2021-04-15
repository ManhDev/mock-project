import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: User;
  updateForm: FormGroup;
  hasError = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;

    this.updateForm = new FormGroup({
      email: new FormControl(this.user.email),
      username: new FormControl(this.user.username),
      image: new FormControl(),
      bio: new FormControl(),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    })
  }

  updateProfile() {
    console.log(this.updateForm);

    let body = { user: { ...this.updateForm.value } }

    this.authService.updateProfile(body).subscribe((res: { user: User }) => {
      let userMock = { user: { email: this.updateForm.value.email, password: this.updateForm.value.password } }
      this.authService.signIn(userMock).then(() => { this.router.navigate(['/profile/' + res.user.username]) }).catch(err => console.log(err))
    },
      (error: any) => {
        this.hasError = true

      }
    )
  }

}
