import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './../../../common/loading/loading.component';
import { UserService } from './../../../../services/user.service';
import { AuthService } from './../../../../services/auth.service';
import { Article } from './../../../../models/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';


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
  loadingModalRef: any;

  modalOption: NgbModalOptions = {};
  constructor(private articleService: ArticlesService, public authService: AuthService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.loadingModalRef = this.modalService.open(LoadingComponent)
    if (this.authService.isLogIn()) {
      this.getFeedListArticles(this.limit, this.offset);
      if (!this.userService.getFriends()) {
        this.hasArticle = true
      }
    }
  }

  getFeedListArticles(limit, offset) {
    this.articleService
      .getMyFeedArticles(limit, offset).pipe(finalize(() => { this.loadingModalRef.close() }))
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.feedArticles = this.feedArticles.concat(res.articles);
        this.totalArtilces = res.articlesCount
      });
  }

  onScrollingFinished() {
    this.offset += 10;
    if (this.offset <= this.totalArtilces) { this.getFeedListArticles(this.limit, this.offset); this.loadingModalRef = this.modalService.open(LoadingComponent) }
  }

}
