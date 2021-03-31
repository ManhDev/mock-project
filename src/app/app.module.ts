

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
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule,
    NgbModule
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
export class AppModule { }
