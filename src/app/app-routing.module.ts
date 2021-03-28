import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { HomeComponent } from './components/screens/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
