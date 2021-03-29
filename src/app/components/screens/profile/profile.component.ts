import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  mode = 'myArticles';
  constructor() {}

  ngOnInit(): void {}
  myArticles() {
    this.mode = 'myArticles';
  }
  favoritedArticles() {
    this.mode = 'favoritedArticles';
  }
}
