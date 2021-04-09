import { Comment } from './../../../models/comment';
import { CommentsService } from './../../../services/comments.service';
import { Article } from '../../../models/article';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @Input('article') article: Article;
  comments: Comment[] = [];
  focusComment: boolean;

  constructor(
    private commentsService: CommentsService,
    private articleService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.commentsService
      .getCommentBySlug(this.article.slug)
      .subscribe((res) => {
        this.comments = res['comments'];
        console.log(this.comments);
      });
  }

  addNewComment($event) {
    this.commentsService
      .getCommentBySlug(this.article.slug)
      .subscribe((res) => {
        this.comments = res['comments'];
      });
  }

  onComment() {
    this.focusComment = true;
  }

  likeHandler(article) {
    if (!article.favorited) {
      this.articleService.like(article.slug).subscribe((res: any) => {
        article.favorited = true;
        article.favoritesCount++;
      });
    } else {
      this.articleService.unLike(article.slug).subscribe((res: any) => {
        article.favorited = false;
        article.favoritesCount--;
      });
    }
  }
}
