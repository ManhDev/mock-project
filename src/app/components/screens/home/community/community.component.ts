import { ArticlesService } from 'src/app/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  globalArticles: Article[] = [];
  offset = 0;
  limit: number = 10;
  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.getGlobalListArticles(this.limit, this.offset)
  }


  getGlobalListArticles(limit, offset) {
    this.articleService
      .getArticles(limit, offset)
      .subscribe((res: { articles: Article[]; articlesCount: number }) => {
        this.globalArticles = res.articles;
      });
  }

  onScroll($event) {
    if ($event.target.scrollTop + $event.target.clientHeight >= $event.target.scrollHeight) {
      this.offset += 10;
      this.getGlobalListArticles(this.limit, this.offset)
    }
  }
}
