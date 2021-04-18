import { LoadingComponent } from './../../common/loading/loading.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from './../../../models/profile';
import { UserService } from './../../../services/user.service';
import { ArticlesService } from './../../../services/articles.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

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
  limit: number = 10;
  offset: number = 0;
  totalsMyArticles: number;
  totalsMyFavoriteArticles: number;
  loadingModalRef: any;
  modalOption: NgbModalOptions = {}
  constructor(private userService: UserService, private articlesService: ArticlesService, private route: ActivatedRoute, public authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.userService.getUserProfile(param.id).subscribe((profile: { profile: Profile }) => {
        this.userData = profile.profile;
      })
      this.getMyListArticles(param.id, this.limit, this.offset)
      this.getMyListFavoriteArticles(param.id, this.limit, this.offset)
      this.loadingModalRef = this.modalService.open(LoadingComponent)
    })
  }

  myArticles(): void {
    this.mode = 'myArticles';
  }
  favoritedArticles(): void {
    this.mode = 'favoritedArticles';
  }
  getMyArticle($event) {
    this.articlesService.getMyArticles(this.authService.currentUser.username, this.limit, this.offset).subscribe((res: { articles: Article[] }) => {
      this.myarticles = res.articles;
    })
  }

  getMyListArticles(username, limit, offset) {
    this.articlesService.getMyArticles(username, limit, offset)
      .pipe(finalize(() => { this.loadingModalRef.close() }))
      .subscribe((res: { articles: Article[], articlesCount: number }) => {
        this.totalsMyArticles = res.articlesCount
        this.myarticles = this.myarticles.concat(res.articles);
      })
  }

  getMyListFavoriteArticles(username, limit, offset) {
    this.articlesService.getMyFovaritedArticles(username, limit, offset)
      .pipe(finalize(() => { this.loadingModalRef.close() }))
      .subscribe((res: { articles: Article[], articlesCount: number }) => {
        this.myfavoritedArticles = this.myfavoritedArticles.concat(res.articles)
        this.totalsMyFavoriteArticles = res.articlesCount;
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
    this.getMyListArticles($event, this.limit, this.offset)
  }

  onScrollingFinished() {
    this.offset += 10;
    if (this.offset <= this.totalsMyArticles && this.mode === 'myArticles') {
      this.getMyListArticles(this.userData.username, this.limit, this.offset);
      this.loadingModalRef = this.modalService.open(LoadingComponent)
    }
    if (this.offset <= this.totalsMyFavoriteArticles && this.mode === 'favoritedArticles') {
      this.getMyListFavoriteArticles(this.userData.username, this.limit, this.offset);
      this.loadingModalRef = this.modalService.open(LoadingComponent)
    }
  }
}

