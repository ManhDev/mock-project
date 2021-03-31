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
  { path: '', component: HomeComponent },

  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'detail',
    component: DetailArticleComponent,
  },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
