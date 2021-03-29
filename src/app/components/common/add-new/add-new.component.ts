import { AddArticlesComponent } from './../add-articles/add-articles.component';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  constructor(private modalService: NgbModal) {

  }
  ngOnInit(): void {

  }

  open() {
    this.modalService.open(AddArticlesComponent)
  }

}
