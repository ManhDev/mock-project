import { CommentsService } from './../../../services/comments.service';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input('comments') comments: Comment[]

  constructor() { }

  ngOnInit(): void {
  }


}
