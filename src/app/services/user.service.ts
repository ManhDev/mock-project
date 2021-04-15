import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url_base = 'https://conduit.productionready.io/api/';
  url_base_follow = 'https://conduit.productionready.io/api/profiles';

  constructor(private http: HttpClient) { }

  getUserProfile(username) {
    return this.http.get(this.url_base + 'profiles/' + username)
  }

  follow(userName) {
    return this.http.post(this.url_base_follow + `/${userName}/follow`, {});
  }

  unFollow(userName) {
    return this.http.delete(this.url_base_follow + `/${userName}/follow`, {});
  }
}
