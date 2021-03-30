import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  time: any;
  constructor() { }

  ngOnInit(): void {
    this.time = new Date()

  }

}
