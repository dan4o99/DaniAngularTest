import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCurrentUser } from 'aws-amplify/auth';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  try {
    const user = await getCurrentUser();
    console.log(user);
    if (user === null) {
      localStorage.setItem('return', window.location.pathname);
      router.navigate(['login']);
    }
    return user !== null;
  } catch (e) {
    console.error(e);
    localStorage.setItem('return', window.location.pathname);
    router.navigate(['login']);
    return false;
  }
};
