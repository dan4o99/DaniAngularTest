import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Amplify } from 'aws-amplify';
import { CommonAnimations } from './animations/common.animation';
import { Observable, filter } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SharedModule } from './modules/material/shared.module';
import { signOut } from 'aws-amplify/auth';
import { LoadingService } from './services/loading.service';
import { MatIconRegistry } from '@angular/material/icon';
import { RoutePath } from './app.routes';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from './components/modal/image-cropper/image-cropper.component';
import { DomSanitizer } from '@angular/platform-browser';

Amplify.configure({
  Auth: {
    Cognito: {
      loginWith: {
        oauth: {
          domain: 'daniangulartestuserpool.auth.eu-central-1.amazoncognito.com',
          scopes: [
            'email',
            'openid',
            'profile',
            'aws.cognito.signin.user.admin',
            'phone',
          ],
          redirectSignIn: [
            'https://localhost:4200/login',
            'https://daniangulartest.de/login',
          ],
          redirectSignOut: [
            'https://localhost:4200/login',
            'https://daniangulartest.de/login',
          ],
          responseType: 'code',
          providers: ['Google'],
        },
      },
      userPoolId: 'eu-central-1_8NA2gbWBI',
      userPoolClientId: '5k65dtnfj666niptqb1e9d550b',
    },
  },
});

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoginComponent, ObserversModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [CommonAnimations.tabTransitionAnimation('animRoutes')],
  providers: [LoadingService, MatIconRegistry, MatDialog],
})
export class AppComponent implements OnInit {
  title = 'angular-test';
  animationState: number = 0;
  file = 'assets/image/Screenshot_2023-11-10_173348.png';

  links = [
    {
      label: 'Home',
      route: RoutePath.HOME,
    },
    // {
    //   label: 'Login',
    //   route: 'login',
    // },
  ];

  loginLink = {
    label: 'Sign in',
    route: RoutePath.LOGIN,
  };

  activeLink = this.links[0].label;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public authenticator: AuthenticatorService,
    public loadingService: LoadingService,
    private readonly iconRegistry: MatIconRegistry,
    private readonly dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((navigationEvent) => navigationEvent instanceof NavigationEnd)
      )
      .subscribe((endNavigationEvent) => {
        console.log(endNavigationEvent);
        this.setActiveLink(endNavigationEvent as NavigationEnd);
      });
  }

  onActivate() {
    this.animationState = this.route.firstChild?.snapshot.data['routeIdx'];
  }

  private setActiveLink(endNavigationEvent: NavigationEnd) {
    if (endNavigationEvent.urlAfterRedirects.includes(this.loginLink.route)) {
      this.activeLink = this.loginLink.label;
    }
    this.links.forEach((link) => {
      if (endNavigationEvent.urlAfterRedirects.includes(link.route)) {
        this.activeLink = link.label;
        return;
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.resetInput();
      this.openAvatarEditor(_file).subscribe((result) => {
        if (result) {
          this.file = result;
        }
      });
    }
  }

  openAvatarEditor(image: string): Observable<any> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }

  private resetInput() {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  async logout() {
    this.loadingService.loading$$.next(true);
    await signOut()
      .then(() => {
        console.log('SIGNED OUT');
        this.router.navigate([RoutePath.LOGIN]);
      })
      .finally(() => this.loadingService.loading$$.next(false));
  }
}
