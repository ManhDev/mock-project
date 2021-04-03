import { Article } from '../../../models/article';
import { ArticlesService } from './../../../services/articles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.scss']
})
export class AddArticlesComponent implements OnInit {
  globalArticles: Article[]
  articleForm: FormGroup;

  constructor(private articleService: ArticlesService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tagList: new FormControl()
    })
  }

  postMyArticle() {
    let article = { article: { ...this.articleForm.value } }
    if (article.article['tagList'] === null) {
      article.article['tagList'] = null
    }
    else {
      article.article['tagList'] = article.article['tagList'].split(" ");
    }
    this.articleService.addNewArticle(article).subscribe(myArticle => { });
    this.activeModal.close('true');
  }

}
