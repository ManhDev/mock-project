import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from './../../../../models/article';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent implements OnInit {
  tagArticles: Article[]
  constructor(private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(pathUrl => {
      this.getArticlesByTags(pathUrl.id)
    })
  }

  getArticlesByTags(tag) {
    this.articleService.getArticleByTag(tag).subscribe((res: any) => {
      this.tagArticles = res.articles
    });
  }

}
