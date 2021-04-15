import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html',
  styleUrls: ['./follow-btn.component.scss'],
})
export class FollowBtnComponent implements OnInit {
  @Input('data') data;
  @Input('followed') followed: boolean;
  @Output('followHandle') follow = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {

  }
  onClick(data) {
    this.follow.emit(data);
  }
}
