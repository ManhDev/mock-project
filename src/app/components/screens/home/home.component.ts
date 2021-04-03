import { SingleArticle } from './../../../models/single_article';
import { ArticlesService } from './../../../services/articles.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mode = "global"
  globalArticles: SingleArticle[] = [];
  feedArticles: SingleArticle[] = [];

  constructor(public authService: AuthService, private articleService: ArticlesService) { }

  ngOnInit(): void {
    if (this.authService.isLogIn()) {
      this.articleService.getMyFeedArticles().subscribe((res: { articles: SingleArticle[], articlesCount: number }) => {
        this.feedArticles = res.articles;
      })
    }
    this.articleService.getArticles().subscribe((res: { articles: SingleArticle[], articlesCount: number }) => {
      this.globalArticles = res.articles;
    })
  }

  feedView() { this.mode = 'myfeed' };
  globalView() { this.mode = 'global' }

  getDataGlobal($event) {
    this.articleService.getArticles().subscribe((res: { articles: SingleArticle[], articlesCount: number }) => {
      this.globalArticles = res.articles;
    })
  }

}
