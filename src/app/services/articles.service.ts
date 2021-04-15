import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  url_base = 'https://conduit.productionready.io/api/articles';

  constructor(private http: HttpClient) { }

  getArticles(limit: number = 10, offset: number) {
    return this.http.get(`${this.url_base}?limit=${limit}&offset=${offset}`);
  }

  getMyFeedArticles(limit: number = 10, offset: number) {
    return this.http.get(`${this.url_base}/feed?limit=${limit}&offset=${offset}`
    );
  }

  getMyFriend() {
    return this.http.get(`${this.url_base}/feed`)
  }

  getArticlesByTag() {
    return this.http.get(this.url_base);
  }

  getMyArticles(username) {
    return this.http.get(this.url_base + '?author=' + username);
  }
  getMyFovaritedArticles(username) {
    return this.http.get(this.url_base + '?favorited=' + username);
  }

  getDetailsAriticle(id) {
    return this.http.get(this.url_base + '/' + id);
  }

  addNewArticle(article) {
    return this.http.post(this.url_base, article);
  }

  like(slug) {
    return this.http.post(this.url_base + `/ ${slug} / favorite`, {});
  }

  unLike(slug) {
    return this.http.delete(this.url_base + `/ ${slug} / favorite`, {});
  }

  getTags() {
    return this.http.get('https://conduit.productionready.io/api/tags');
  }

  getArticleByTag(tag) {
    return this.http.get(this.url_base + '?tag=' + tag);
  }
}
