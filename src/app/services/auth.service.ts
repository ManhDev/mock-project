import { User } from './../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url_base = "https://conduit.productionready.io/";
  currentUser: User;
  loggedIn = null;

  constructor(private http: HttpClient, private router: Router) { }

  isLogIn(): boolean {
    if (this.loggedIn !== null) {
      return this.loggedIn
    }
    let user = localStorage.getItem('user');
    if (!!user) {
      this.currentUser = JSON.parse(user)
      this.loggedIn = true;
      return true
    }
    this.loggedIn = false;
    return false
  }

  signUp(user): Observable<User> {
    return this.http.post(this.url_base + 'api/users', user) as Observable<User>;
  }

  signIn(user) {
    return new Promise<void>((resolve, reject) => {
      this.http.post(this.url_base + 'api/users/login', user).subscribe(
        (res: { user: User }) => {
          this.logUserIn(res.user);
          resolve();
        },
        (err => { reject(err) })
      )

    })
  }

  logOut() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.router.navigate(['']);
  }

  saveToLocalStrorage(key, value) {
    let data = localStorage.getItem(key);
    value = JSON.stringify(value)
    if (data) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, value)
  }

  logUserIn(user) {
    this.loggedIn = true
    this.saveToLocalStrorage('user', user);
  }

}
