import { Comment } from './../../../models/comment';
import { CommentsService } from './../../../services/comments.service';
import { Article } from '../../../models/article';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input('article') article: Article
  comments: Comment[] = []

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getCommentBySlug(this.article.slug).subscribe(res => {
      this.comments = res['comments']
    })
  }

  addNewComment($event) {
    this.commentsService.getCommentBySlug(this.article.slug).subscribe(res => {
      this.comments = res['comments']
    })
  }


  onComment() {
  }

}
