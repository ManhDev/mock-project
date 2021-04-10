import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sourceImage: string;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.currentUser.image === null) {
      this.sourceImage = "https://brighterwriting.com/wp-content/uploads/icon-user-default-420x420.png"
    }
  }

}
