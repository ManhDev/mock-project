import { AddArticlesComponent } from './../../common/add-articles/add-articles.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showDropDown = false;
  @Output('isPost') isPost: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(public authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
    this.showDropDown = false;
  }
  gotoProfile() {
    this.router.navigate([`/profile/${this.authService.currentUser.username}`]);
    this.showDropDown = false;
  }

  open() {
    this.modalService.open(AddArticlesComponent).result.then(res => this.isPost.emit(res)).catch(err => console.log(err))
  }
}
