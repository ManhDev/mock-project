import { AuthService } from './../../../../services/auth.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  globalArticles: Article[] = [];
  unsubcription = new Subject()
  offset = 0;
  limit: number = 10;
  totalArtilces: number;
  constructor(private articleService: ArticlesService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getGlobalListArticles(this.limit, this.offset)
    this.articleService.isMoreData.pipe(takeUntil(this.unsubcription)).subscribe(res => { if (res) { this.getGlobalListArticles(this.limit, this.offset) } })
  }

  getGlobalListArticles(limit, offset) {
    this.articleService
      .getArticles(limit, offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.globalArticles = res.articles;
        this.totalArtilces = res.articlesCount
      });
  }

  onScroll($event) {
    if ($event.target.scrollTop + $event.target.clientHeight >= $event.target.scrollHeight) {
      this.offset += 10;
      if (this.offset <= this.totalArtilces) { this.getGlobalListArticles(this.limit, this.offset) }
    }
  }

  ngDestroy() {
    this.unsubcription.next();
    this.unsubcription.complete();
  }
}
