import { AuthService } from './../../../services/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input('comments') comments: Comment[]
  @Output('id') idComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  deleteComment(id) {
    this.idComment.emit(id)


  }


}
