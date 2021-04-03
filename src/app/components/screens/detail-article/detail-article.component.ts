import { Article } from './../../../models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from './../../../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  articleDetails: Article
  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(res =>
      this.articlesService.getDetailsAriticle(res.id).subscribe((data: Article) => {
        this.articleDetails = data
        console.log(this.articleDetails);

      }))
  }

}
