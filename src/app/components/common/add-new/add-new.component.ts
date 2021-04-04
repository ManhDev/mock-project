import { User } from './../../../models/user';
import { AddArticlesComponent } from './../add-articles/add-articles.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @Input('user') user = {} as User
  @Output('isPost') isPost: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.user.image === null) {
      this.user.image = 'https://brighterwriting.com/wp-content/uploads/icon-user-default-420x420.png'
    }
  }

  open() {
    this.modalService.open(AddArticlesComponent).result.then(res => this.isPost.emit(res)).catch(err => console.log(err))
  }

}
