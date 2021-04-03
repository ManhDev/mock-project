import { AddArticlesComponent } from './../add-articles/add-articles.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  user: any;
  @Output('isPost') isPost: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private modalService: NgbModal) {

  }
  ngOnInit(): void {
    let userLocal = localStorage.getItem('user')
    this.user = JSON.parse(userLocal)
    if (this.user['user']['image'] === null) {
      this.user['user']['image'] = 'https://brighterwriting.com/wp-content/uploads/icon-user-default-420x420.png'
    }
  }

  open() {
    this.modalService.open(AddArticlesComponent).result.then(res => this.isPost.emit(res)).catch(err => console.log(err))
  }

}
