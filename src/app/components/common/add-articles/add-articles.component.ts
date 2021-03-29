import { ArticlesService } from './../../../services/articles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.scss']
})
export class AddArticlesComponent implements OnInit {
  myArticle: any;
  articleForm: FormGroup
  constructor(private articleService: ArticlesService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tagList: new FormControl()
    })
  }

  onCreate() {
    let article = { article: { author: { username: "doanmanh" }, ...this.articleForm.value } }
    article.article['tagList'] = article.article['tagList'].split(" ");
    this.articleService.addNewArticle(article).subscribe(res => {
      this.myArticle = res
    });
    this.activeModal.close();
  }

}
