import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService); // injecting 
  //cookieService in this way, since we don't have constructors here
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser(); // to get user information for roles stored
// this gets the user from the local storage
  // Check for the JWT Token
  let token = cookieService.get('Authorization');

  if (token && user) { // replace Bearer word with
    // empty string in the token before passing it in jwt_decode
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwt_decode(token);

    // Check if token has expired
    const expirationDate = decodedToken.exp * 1000;// converting 
                                              //it to miliseconds
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {// this means expiration date
      // was in the past, means it has expired by now
      //so,
      // Logout
      authService.logout();
      // send them to login page
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
      // way of navigation             path          give us the state of url they are in
    } else {
      // Token is still valid

      if (user.roles.includes('Writer')) {
        return true; // navigate them to admin pages
      } else {
        alert('Unauthorized');
        return false; // if logged in, but not a writer.
        //Not allow them and show them this Unauthorized message 
        //and render them a blank page
      }
    }
  } else {
    // Logout
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
