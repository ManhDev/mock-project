import { Article } from './../../../models/article';
import { ArticlesService } from '../../../services/articles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.scss']
})
export class AddArticlesComponent implements OnInit {
  globalArticles: Article[]
  articleForm: FormGroup;
  isPostArticle = false;
  @Input() edit = false;
  @Input() article: Article

  constructor(private articleService: ArticlesService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm()
    if (this.edit) {
      this.editForm()
    }
  }

  initForm() {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tagList: new FormControl()
    })
  }
  editForm() {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title),
      description: new FormControl(this.article.description),
      body: new FormControl(this.article.body),
    })
  }

  cancelPost() {
    this.activeModal.close()
  }

  postMyArticle() {
    this.isPostArticle = true
    if (this.edit || this.articleForm.valid) {
      this.activeModal.close(this.articleForm.value);
    }
  }

}
