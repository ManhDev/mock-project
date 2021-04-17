import { ArticlesService } from '../../../services/articles.service';
import { User } from '../../../models/user';
import { AddArticlesComponent } from '../form-articles/add-articles.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @Input('user') user = {} as User
  @Output('isPost') isPost: EventEmitter<boolean> = new EventEmitter<boolean>()
  modalOption: NgbModalOptions = {};
  constructor(private modalService: NgbModal, private articleService: ArticlesService) { }

  ngOnInit(): void {

  }

  open() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalService.open(AddArticlesComponent, this.modalOption).result.then(res => {
      if (res) {
        let article = { article: { ...res } }
        if (article.article?.tagList === null) {
          article.article.tagList = null
        }
        else {
          article.article['tagList'] = article.article['tagList'].split(" ");
        }
        this.articleService.addNewArticle(article).subscribe(myArticle => { this.isPost.emit(true) });
      }
    }
    ).catch(err => console.log(err))
  }

}
