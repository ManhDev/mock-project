import { Router, NavigationEnd } from '@angular/router';
import { User } from './../../../models/user';
import { Article } from './../../../models/article';
import { ArticlesService } from './../../../services/articles.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  userData = {} as User;
  friends = [];
  tags = [];
  chooseTag = '';
  isViewTag = false;

  constructor(
    public authService: AuthService,
    private articleService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getListTags()
    if (this.authService.isLogIn()) { this.getFriends() }


    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((res: any) => {
      if (res.url.includes('/community') || res.url.includes('/news')) {
        this.isViewTag = false
      }
    })
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
    this.chooseTag = tag;
    this.isViewTag = true
    this.router.navigate(['phakebook/' + tag])
  }

}
