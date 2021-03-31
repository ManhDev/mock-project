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
}
