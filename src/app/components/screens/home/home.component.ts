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
  friends = [];
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
  ) { }

  ngOnInit(): void {
    this.getGlobalListArticles(this.limit, this.offset)
    this.getListTags();
    if (this.authService.isLogIn()) {
      this.userData = this.authService.currentUser;
      this.getFeedListArticles(this.limit, this.offset);
    }

    this.getFriends()
  }

  feedView() {
    this.mode = 'myfeed';
    this.chooseTag = '';
  }

  globalView() {
    this.mode = 'global';
    this.chooseTag = '';
  }

  tagView() {
    this.mode = 'tagArticle';
  }

  getDataGlobal($event) {
    this.getFeedListArticles(this.limit, this.offset)
    this.getGlobalListArticles(this.limit, this.offset)
  }

  onScroll($event) {
    if ($event.target.scrollTop + $event.target.clientHeight >= $event.target.scrollHeight) {
      this.offset += 10;
      if (this.mode == 'global') {
        this.getGlobalListArticles(this.limit, this.offset)
      }
      if (this.mode == 'myfeed') {
        this.getFeedListArticles(this.limit, this.offset);
      }
    }
  }

  getGlobalListArticles(limit, offset) {
    this.articleService
      .getArticles(limit, offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.globalArticles = res.articles;
        this.globaltotalItems = res.articlesCount;
      });
  }

  getFeedListArticles(limit, offset) {
    this.articleService
      .getMyFeedArticles(limit, offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.feedArticles = res.articles;
        this.feedtotalItems = res.articlesCount;
      });
  }

  getFriends() {
    this.articleService.getMyFriend().subscribe((res: { articles: Article[] }) => {
      let user = res.articles.map(item => item.author.username);
      let arrUser = []
      for (let i = 0; i < user.length; i++) {
        if (arrUser.indexOf(user[i]) === -1) {
          arrUser.push(user[i])
        }
      }
      this.friends = arrUser
    })
  }

  getListTags() {
    this.articleService.getTags().subscribe((res: any) => {
      this.tags = res.tags.filter(e => JSON.stringify(e).replace(/\W/g, '').length);
    });
  }

  getListArticlesByTag(tag) {
    this.mode = 'tagArticle';
    this.chooseTag = '#' + tag;
    this.articleService.getArticleByTag(tag).subscribe((res: any) => {
      this.tagArticles = res.articles
    });
  }
}
