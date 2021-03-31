import { SingleArticle } from './../../../models/single_article';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input('article') article: SingleArticle
  constructor() { }

  ngOnInit(): void {
  }

}
