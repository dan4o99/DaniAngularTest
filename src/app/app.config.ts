import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withDebugTracing,
  withHashLocation,
} from '@angular/router';

import { routes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withDebugTracing())],
};
