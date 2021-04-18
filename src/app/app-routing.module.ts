import { ComingSoonComponent } from './components/screens/coming-soon/coming-soon.component';
import { AboutUsComponent } from './components/screens/about-us/about-us.component';
import { TagsViewComponent } from './components/screens/home/tags-view/tags-view.component';
import { NewsComponent } from './components/screens/home/news/news.component';
import { CommunityComponent } from './components/screens/home/community/community.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { EditComponent } from './components/screens/edit/edit.component';
import { DetailArticleComponent } from './components/screens/detail-article/detail-article.component';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { HomeComponent } from './components/screens/home/home.component';
const routes: Routes = [
  { path: '', redirectTo: 'phakebook', pathMatch: 'full' },
  {
    path: 'phakebook', component: HomeComponent, children: [
      { path: '', redirectTo: 'community', pathMatch: 'full' },
      { path: 'community', component: CommunityComponent },
      { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
      { path: ':id', component: TagsViewComponent }
    ]
  },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile/:id/edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'articles/:id', component: DetailArticleComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'coming-soon', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
