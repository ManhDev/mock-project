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
  constructor(private userService: UserService, private articlesService: ArticlesService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.userService.getUserProfile(param.id).subscribe((profile: { profile: Profile }) => {
        this.userData = profile.profile
        if (this.userData.image === null) {
          this.userData.image = 'https://brighterwriting.com/wp-content/uploads/icon-user-default-420x420.png'
        }
        this.articlesService.getMyArticles(param.id).subscribe((res: { articles: Article[] }) => {
          this.myarticles = res.articles
        })
        this.articlesService.getMyFovaritedArticles(param.id).subscribe((res: { articles: Article[] }) => {
          this.myfavoritedArticles = res.articles
        })
      })
    })
  }

  myArticles(): void {
    this.mode = 'myArticles';
  }
  favoritedArticles(): void {
    this.mode = 'favoritedArticles';
  }
}
