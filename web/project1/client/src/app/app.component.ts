import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Therapist Admin History Tracker';
  private _isNotLoggedIn:boolean;
  private _user:any;

  constructor(private authService:AuthService, private router:Router) {
    
  this._isNotLoggedIn = true;
  this.authService.authStateChange()
        .subscribe(authState => {
            this._isNotLoggedIn = !(authState.state === 'signedIn');
            if (!authState.user) {
                this._user = null;
            } else {
                this._user = authState.user;
            }
        });
  }

  ngOnInit() {
    this.authService.currentAuthenticatedUser().then((user) =>{
      this._isNotLoggedIn = false;
      this._user = user;
    })
    .catch((error) => {
      // if we first load and we are not logged in we need to make sure we go to the login route if we are not there already.
      this.router.navigate(["/login"]);
    })
  }

  public goHome() {
    if (this._user) {
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  public get Username() {
    return this._user ? this._user.username : '';
  }

  public get isNotLoggedIn() {
    return this._isNotLoggedIn;
  }

  public logout() {
    this._isNotLoggedIn = true;
    this._user = null;
    this.authService.signOut()
    .then(data => {
      console.log(data)
      this.router.navigate(["/login"]);
    })
    .catch(err => console.log(err));
  }
}
