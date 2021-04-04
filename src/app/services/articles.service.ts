import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  url_base = "https://conduit.productionready.io/";


  constructor(private http: HttpClient, private authService: AuthService) { }

  getArticles() {
    return this.http.get(this.url_base + 'api/articles?limit=10&offset=0')
  }

  getMyFeedArticles() {
    return this.http.get(this.url_base + 'api/articles/feed?limit=10&offset=0')
  }

  getMyArticles(username) {
    return this.http.get(this.url_base + 'api/articles?author=' + username)
  }
  getMyFovaritedArticles(username) {
    return this.http.get(this.url_base + 'api/articles?favorited=' + username)
  }

  getDetailsAriticle(id) {
    return this.http.get(this.url_base + 'api/articles/' + id)
  }

  addNewArticle(article) {
    return this.http.post(this.url_base + '/api/articles', article)
  }
}
