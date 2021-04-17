import { Article } from './../../../models/article';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Comment } from './../../../models/comment';
import { CommentsService } from './../../../services/comments.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output('loadingData') loadingData: EventEmitter<any> = new EventEmitter<any>();
  comments: Comment[] = [];
  editAndDelete = false;

  constructor(
    private commentsService: CommentsService,
    private articleService: ArticlesService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getListComments(this.article.slug);
    if (this.authService.isLogIn()) {
      if (this.authService.currentUser.username === this.article.author?.username) {
        this.editAndDelete = true
      }
    }
  }

  addNewComment($event) {
    this.getListComments(this.slug)
  }

  getListComments(slug) {
    this.commentsService.getCommentBySlug(slug).subscribe((res: { comments: Comment[] }) => {
      this.comments = res.comments
    });
  }


  likeHandler(article) {
    if (this.authService.isLogIn()) {
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
    else {
      this.router.navigate(['/login'])
    }
  }

  delete($event) {
    this.articleService.deleteArticle(this.article.slug).subscribe(res => {
      this.loadingData.emit(this.article.author.username)
    })
  }

  edit(body) {
    if (!body.title && !body.description && !body.body) {
      return
    }
    let updateArticle = { article: { ...body } }
    this.articleService.editArticle(this.article.slug, updateArticle).subscribe((res: { article: Article }) => {
      this.article = res.article
    })
  }

  deleteMyComment($event) {
    this.commentsService.deleteComment(this.article.slug, $event).subscribe(res => {
      this.getListComments(this.article.slug)

    })
  }
}
