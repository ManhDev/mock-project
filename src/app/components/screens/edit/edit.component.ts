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
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;

    this.updateForm = new FormGroup({
      email: new FormControl({ value: this.user.email, disabled: true }),
      username: new FormControl(this.user.username, [Validators.required]),
      image: new FormControl(this.user.image),
      bio: new FormControl(this.user.bio),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    })
  }

  updateProfile() {


    let body = { user: { ...this.updateForm.value } }

    this.authService.updateProfile(body).then(() => { this.router.navigate(['/profile/' + this.updateForm.value.username]) }).catch(() => this.hasError = true)

    // this.authService.updateProfile(body).subscribe((res: { user: User }) => {
    //   let userMock = { user: { email: this.user.email, password: this.updateForm.value.password } }
    //   this.authService.signIn(userMock).then(() => { this.router.navigate(['/profile/' + res.user.username]) }).catch(err => console.log(err))
    // },
    //   (error: any) => {
    //     this.hasError = true

    //   }
    // )
  }

  cancel() {
    this.router.navigate([`/profile/${this.authService.currentUser.username}`])
  }

}
