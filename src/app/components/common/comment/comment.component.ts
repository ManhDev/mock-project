import { CommentsService } from './../../../services/comments.service';
import { SingleArticle } from './../../../models/single_article';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input('article') article: SingleArticle;
  comments: []

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getCommentBySlug(this.article['slug']).subscribe(res => {
      this.comments = res['comments']
    })
  }

}
