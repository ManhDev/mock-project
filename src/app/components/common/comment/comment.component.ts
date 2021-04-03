import { CommentsService } from './../../../services/comments.service';
import { SingleArticle } from './../../../models/single_article';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input('comments') comments



  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }





}
