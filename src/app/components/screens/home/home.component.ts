import { User } from './../../../models/user';
import { Article } from './../../../models/article';
import { ArticlesService } from './../../../services/articles.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mode = 'global';
  userData = {} as User;
  globalArticles: Article[] = [];
  feedArticles: Article[] = [];
  tagArticles: Article[] = [];
  page: number = 1;
  offset = 0;
  limit: number = 10;
  globaltotalItems = 0;
  feedtotalItems = 0;
  tags = [];
  chooseTag = '';
  constructor(
    public authService: AuthService,
    private articleService: ArticlesService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogIn()) {
      this.userData = this.authService.currentUser;
      this.articleService
        .getMyFeedArticles(this.limit, this.offset)
        .subscribe((res: { articles: Article[]; articlesCount: number }) => {
          this.feedArticles = res.articles;
          this.feedtotalItems = res.articlesCount;
        });
    }

    this.articleService
      .getArticles(this.limit, this.offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.globalArticles = res.articles;
        this.globaltotalItems = res.articlesCount;
      });

    // get tags
    this.articleService.getTags().subscribe((res: any) => {
      this.tags = res.tags;
    });
  }

  feedView() {
    this.mode = 'myfeed';
  }
  globalView() {
    this.mode = 'global';
  }

  getDataGlobal($event) {
    this.articleService
      .getArticles(this.limit, this.offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.globalArticles = res.articles;
      });
  }

  onPageChange($event) {
    this.offset = ($event - 1) * this.limit;
    if (this.mode == 'global') {
      this.articleService
        .getArticles(this.limit, this.offset)
        .subscribe((res: { articles: Article[]; articlesCount: number }) => {
          this.globalArticles = res.articles;
        });
    }
    if (this.mode == 'myfeed') {
      this.articleService
        .getMyFeedArticles(this.limit, this.offset)
        .subscribe((res: { articles: Article[]; articlesCount: number }) => {
          this.feedArticles = res.articles;
        });
    }
  }

  showArticleByTag(tag) {
    this.mode = 'tagArticle';
    this.chooseTag = tag;
    this.articleService.getArticleByTag(tag).subscribe((res: any) => {
      this.tagArticles = res.articles;
    });
  }
}
