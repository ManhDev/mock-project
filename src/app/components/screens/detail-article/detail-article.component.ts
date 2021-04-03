import { SingleArticle } from './../../../models/single_article';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ArticlesService } from './../../../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  articleDetails: SingleArticle
  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(res =>
      this.articlesService.getDetailsAriticle(res.id).subscribe((data: SingleArticle) => {
        this.articleDetails = data
        console.log(this.articleDetails);

      }))
  }

}
