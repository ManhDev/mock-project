import { Profile } from './../../../models/profile';
import { UserService } from './../../../services/user.service';
import { ArticlesService } from './../../../services/articles.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  mode = 'myArticles';
  userData = {} as Profile;
  myarticles = [] as Article[];
  myfavoritedArticles = [] as Article[];
  link: string
  constructor(private userService: UserService, private articlesService: ArticlesService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.userService.getUserProfile(param.id).subscribe((profile: { profile: Profile }) => {
        this.userData = profile.profile;
      })
      this.getMyListArticles(param.id)
      this.getMyListFavoriteArticles(param.id)
    })


  }

  myArticles(): void {
    this.mode = 'myArticles';
  }
  favoritedArticles(): void {
    this.mode = 'favoritedArticles';
  }
  getMyArticle($event) {
    this.articlesService.getMyArticles(this.authService.currentUser.username).subscribe((res: { articles: Article[] }) => {
      this.myarticles = res.articles;
    })
  }

  getMyListArticles(username) {
    this.articlesService.getMyArticles(username).subscribe((res: { articles: Article[] }) => {
      this.myarticles = res.articles
    })
  }

  getMyListFavoriteArticles(username) {
    this.articlesService.getMyFovaritedArticles(username).subscribe((res: { articles: Article[] }) => {
      this.myfavoritedArticles = res.articles
    })
  }

  followHandler(profile) {
    if (!profile.following) {
      this.userService.follow(profile.username).subscribe((res) => {
        profile.following = true;
      });
    } else {
      this.userService.unFollow(profile.username).subscribe((res) => {
        profile.following = false;
      });
    }
  }

  getDataAgain($event) {
    this.getMyListArticles($event)
  }
}
