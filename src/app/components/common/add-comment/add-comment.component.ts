import { AuthService } from './../../../services/auth.service';
import { Article } from '../../../models/article';
import { FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input('article') article: Article;
  @Output('mycomment') mycomment: EventEmitter<any> = new EventEmitter<any>()

  comment = new FormControl('', Validators.required)
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  addComment() {
    let newComment = {
      comment: { body: this.comment.value }
    }
    this.mycomment.emit(newComment)
    this.comment.reset()
  }
}
