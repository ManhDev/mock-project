import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/screens/navbar/navbar.component';
import { HomeComponent } from './components/screens/home/home.component';
import { AddArticlesComponent } from './components/common/add-articles/add-articles.component';
import { ProfileComponent } from './components/screens/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddArticlesComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
