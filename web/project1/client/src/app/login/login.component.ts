import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'dac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private amplifyService: AmplifyService, private authService:AuthService, private router:Router) { 
    this.authService.authStateChange()
        .subscribe(authState => {
          if (authState.state == 'signedIn') {
            // TODO: stephen need to sync the state with the server here... creating the user or updating any information about them
            // that we have.
              this.router.navigate(['/home']);
          }
        });
  }

  ngOnInit() {
    // @see https://aws-amplify.github.io/docs/js/authentication
    let session = this.authService.currentAuthenticatedUser().then((user) =>{
      this.router.navigate(['home']);
    })
    .catch((error) =>{
      // not logged in so we can just ignore this error.
    });
  }

}
