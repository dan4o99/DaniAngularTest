import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

export enum RoutePath {
  HOME = 'home',
  LOGIN = 'login',
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: RoutePath.HOME,
    component: HomeComponent,
    data: { routeIdx: 0 },
  },
  {
    path: RoutePath.LOGIN,
    component: LoginComponent,
    data: { routeIdx: 1 },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
