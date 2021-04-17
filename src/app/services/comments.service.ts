import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url_base = "https://conduit.productionready.io/api"
  constructor(private http: HttpClient) { }

  getCommentBySlug(slug: string) {
    return this.http.get(this.url_base + '/articles/' + slug + '/comments')
  }

  addCommentBySlug(slug: string, comment: any) {
    return this.http.post(this.url_base + '/articles/' + slug + '/comments', comment)
  }

  deleteComment(slug, id) {
    return this.http.delete(this.url_base + `/articles/${slug}/comments/${id}`);
  }
}
