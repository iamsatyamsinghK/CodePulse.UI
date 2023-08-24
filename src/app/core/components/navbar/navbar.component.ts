import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar', // used in app.component.html file
                             // to render this component
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService,
    private router: Router) {
  }


  ngOnInit(): void { // listening to those changes in the auth service
    this.authService.user() // returning the observable of type User
                          // user() : Observable<User | undefined> 
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

  }

  onLogout(): void {
    this.authService.logout(); //auth service
    this.router.navigateByUrl('/');// bring them back to the home page 
  }

}
