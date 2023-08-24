import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }


  setUser(user: User): void {
    this.$user.next(user); // emitting new value of the user
    // through the behaviour subject ($user)--------------------------
    localStorage.setItem('user-email', user.email);             //   |
    localStorage.setItem('user-roles', user.roles.join(','));  //    |
  }                                  // since roles is an array here |
     // this user observable is actually emitting values when        | 
     //the values are changing , so the user has logged in now and we  |
     //we are emitting a value and navbar is subscribig to these changes|                                   |                    //    |
  user() : Observable<User | undefined> { // and any subscribers <----
    // of that observable will listen to those changes
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(',')
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');  // Set Auth Cookie
    //this.cookieService.set('Authorization', `Bearer ${response.token}`,
    // undefined, '/', undefined, true, 'Strict');  login.component.ts
    this.$user.next(undefined); 
    //emitting a new value(undefined) to it's subscribers, 
    //telling the application that the user has now logged out
  }

}
