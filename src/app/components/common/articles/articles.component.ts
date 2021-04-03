import { CommentsService } from './../../../services/comments.service';
import { ArticlesService } from './../../../services/articles.service';
import { SingleArticle } from './../../../models/single_article';
import { Component, Input, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input('article') article: SingleArticle
  comments = []

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getCommentBySlug(this.article['slug']).subscribe(res => {
      this.comments = res['comments']
    })
  }

  onComment() {
  }

  addNewComment($event) {
    this.commentsService.getCommentBySlug(this.article['slug']).subscribe(res => {
      this.comments = res['comments']
    })
  }


}
