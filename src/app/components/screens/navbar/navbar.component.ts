import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showDropDown = false;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
  gotoProfile() {
    this.router.navigate([`/profile/${this.authService.currentUser.username}`]);
    this.showDropDown = false;
  }
}
