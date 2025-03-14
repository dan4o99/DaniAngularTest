import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { SharedModule } from '../../modules/material/shared.module';
import { RoutePath } from '../../app.routes';
import { LocalStorage } from '../../enum/local-storage.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [AmplifyAuthenticatorModule, SharedModule],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public authenticator: AuthenticatorService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params: Params) => {
      try {
        const user = await getCurrentUser();
        const returnRoute = localStorage.getItem(LocalStorage.RETURN);
        if (user && (!returnRoute || returnRoute.includes(RoutePath.LOGIN))) {
          this.router.navigate([RoutePath.HOME]);
          localStorage.removeItem(LocalStorage.RETURN);
        }
        if (user && returnRoute) {
          this.router.navigate([localStorage.getItem(LocalStorage.RETURN)]);
          localStorage.removeItem(LocalStorage.RETURN);
        }
      } catch (e) {
        //ignore
      }
    });
  }
}
