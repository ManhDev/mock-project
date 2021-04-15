import { LikeComponent } from './components/common/like/like.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/screens/navbar/navbar.component';
import { HomeComponent } from './components/screens/home/home.component';
import { AddArticlesComponent } from './components/common/add-articles/add-articles.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { LoginComponent } from './components/screens/login/login.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComponent } from './components/common/add-new/add-new.component';
import { AuthInterceptor } from './guard/auth.interceptor';
import { CommentComponent } from './components/common/comment/comment.component';
import { ArticlesComponent } from './components/common/articles/articles.component';
import { BodyCustomPipe } from './components/common/pipe/body-custom.pipe';
import { DetailArticleComponent } from './components/screens/detail-article/detail-article.component';
import { AddCommentComponent } from './components/common/add-comment/add-comment.component';
import { FollowBtnComponent } from './components/common/follow-btn/follow-btn.component';
import { SidebarComponent } from './components/screens/sidebar/sidebar.component';
import { EditComponent } from './components/screens/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddArticlesComponent,
    ProfileComponent,
    LoginComponent,
    SignUpComponent,
    AddNewComponent,
    CommentComponent,
    ArticlesComponent,
    BodyCustomPipe,
    DetailArticleComponent,
    AddCommentComponent,
    LikeComponent,
    FollowBtnComponent,
    SidebarComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
