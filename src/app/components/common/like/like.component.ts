import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Input('data') article
  @Input('favoritesCnt') likeCnt: number;
  @Output('like') like: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(article) {
    console.log(article);

    this.like.emit(article);
  }
}
