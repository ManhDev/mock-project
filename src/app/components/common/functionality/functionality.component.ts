import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from './../../../models/article';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AddArticlesComponent } from '../form-articles/add-articles.component';


@Component({
  selector: 'app-functionality',
  templateUrl: './functionality.component.html',
  styleUrls: ['./functionality.component.scss']
})
export class FunctionalityComponent implements OnInit {
  @Input('article') article: Article;
  @Input('editAndDelete') editAndDelete: boolean;
  @Output('acticeFunction') acticeFunction: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output('delete') delete: EventEmitter<any> = new EventEmitter<any>()
  @Output('edit') edit: EventEmitter<any> = new EventEmitter<any>()
  showDropDown = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  showFunctinality() {
    this.showDropDown = !this.showDropDown
    this.acticeFunction.emit()
  }

  deleteMyArticle() {
    this.showDropDown = false;
    this.delete.emit()
  }

  editArticle() {
    this.showDropDown = false;

    let modalRef = this.modalService.open(AddArticlesComponent)
    modalRef.componentInstance.edit = true;
    modalRef.componentInstance.article = this.article
    modalRef.result.then(res => {
      this.edit.emit(res)
    }).catch(err => {
      console.log(err);
    })

  }

}
