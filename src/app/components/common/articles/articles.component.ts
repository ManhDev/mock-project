import { AuthService } from './../../../services/auth.service';
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
  @Input('isShowDetail') isShowDetail: boolean = false;
  @Input('slug') slug: string;
  comments: Comment[] = [];
  focusComment: boolean;
  showFunction = false;
  editAndDelete = false;

  constructor(
    private commentsService: CommentsService,
    private articleService: ArticlesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getListComments();
    if (this.authService.currentUser.username === this.article.author.username) {
      this.editAndDelete = true
    }
  }

  addNewComment($event) {
    this.getListComments()
  }


  getListComments() {
    this.commentsService
      .getCommentBySlug(this.slug)
      .subscribe((res) => {
        this.comments = res['comments'];
      });
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

  showFunctinality() {
    this.showFunction = !this.showFunction
  }
}
