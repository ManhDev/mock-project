import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  url_base = "https://conduit.productionready.io/";
  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(this.url_base + 'api/articles')
  }
  getMyFeedArticles() {
    return this.http.get(this.url_base + 'api/articles/feed')
  }
  getDetailsAriticle(id) {
    return this.http.get(this.url_base + 'api/articles/:' + id)
  }

  addNewArticle(article) {
    return this.http.post(this.url_base + '/api/articles', article)
  }
}
