import { UserService } from './../../../../services/user.service';
import { AuthService } from './../../../../services/auth.service';
import { Article } from './../../../../models/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  feedArticles: Article[] = [];
  totalArtilces: number;
  hasArticle = false;
  offset: number = 0;
  limit: number = 10;
  constructor(private articleService: ArticlesService, public authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.authService.isLogIn()) {
      this.getFeedListArticles(this.limit, this.offset);
      if (!this.userService.getFriends()) {
        this.hasArticle = true
      }
    }
  }

  getFeedListArticles(limit, offset) {
    this.articleService
      .getMyFeedArticles(limit, offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.feedArticles = res.articles;
        this.totalArtilces = res.articlesCount
      });
  }

  onScroll($event) {
    if ($event.target.scrollTop + $event.target.clientHeight >= $event.target.scrollHeight) {
      this.offset += 10;
      if (this.offset <= this.totalArtilces) { this.getFeedListArticles(this.limit, this.offset) }
    }
  }

}
