import { CommentsService } from './../../../services/comments.service';
import { Article } from './../../../models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from './../../../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss'],
})
export class DetailArticleComponent implements OnInit {
  articleDetails = {} as Article;
  comments = [];
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) =>
      this.articlesService
        .getDetailsAriticle(res.id)
        .subscribe((data: { article: Article }) => {
          this.articleDetails = data.article;

          console.log(this.articleDetails);

          this.commentsService
            .getCommentBySlug(this.articleDetails.slug)
            .subscribe((res) => {
              this.comments = res['comments'];
            });
        })
    );
  }

  addNewComment($event) {
    this.commentsService
      .getCommentBySlug(this.articleDetails.slug)
      .subscribe((res) => {
        this.comments = res['comments'];
      });
  }

  onComment() {}

  likeHandler(articleDetails) {
    if (!articleDetails.favorited) {
      this.articlesService.like(articleDetails.slug).subscribe((res: any) => {
        articleDetails.favorited = true;
        articleDetails.favoritesCount++;
      });
    } else {
      this.articlesService.unLike(articleDetails.slug).subscribe((res: any) => {
        articleDetails.favorited = false;
        articleDetails.favoritesCount--;
      });
    }
  }

  followHandler(articleDetails) {
    if (!articleDetails.author.following) {
      this.articlesService
        .follow(articleDetails.author.username)
        .subscribe((res) => {
          articleDetails.author.following = true;
        });
    } else {
      this.articlesService
        .unFollow(articleDetails.author.username)
        .subscribe((res) => {
          articleDetails.author.following = false;
        });
    }
  }
}
