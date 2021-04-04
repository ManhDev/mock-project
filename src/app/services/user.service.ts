import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url_base = 'https://conduit.productionready.io/api/'

  constructor(private http: HttpClient) { }

  getUserProfile(username) {
    return this.http.get(this.url_base + 'profiles/' + username)
  }
}
