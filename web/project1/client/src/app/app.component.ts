import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import {awsmobile} from "../aws-exports";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Therapist Admin History Tracker';
  private _isNotLoggedIn:boolean;
  private _user:any;

  constructor(private amplifyService:AmplifyService, private router:Router) {
    this.amplifyService.auth().configure({

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: awsmobile.aws_cognito_identity_pool_id, // 'us-east-1:0c4629df-3bcc-49b5-be6e-5861d5283b56',
      
      // REQUIRED - Amazon Cognito Region
      region: awsmobile.aws_cognito_region, // 'us-east-1',

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      // identityPoolRegion: 'XX-XXXX-X',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: awsmobile.aws_user_pools_id, // 'us-east-1_s9iDqPquj',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: awsmobile.aws_user_pools_web_client_id, //'1271f4r7a3f24kk53j6emll9nb',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: false,

      // OPTIONAL - Configuration for cookie storage
      // cookieStorage: {
      // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      //     domain: '.yourdomain.com',
      // // OPTIONAL - Cookie path
      //     path: '/',
      // // OPTIONAL - Cookie expiration in days
      //     expires: 365,
      // // OPTIONAL - Cookie secure flag
      //     secure: true
      // },

      // OPTIONAL - customized storage object
      // storage: new MyStorage(),
      
      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      // authenticationFlowType: 'USER_PASSWORD_AUTH'
  });
  this._isNotLoggedIn = true;
    this.amplifyService.authStateChange$
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
    this.amplifyService.auth().currentAuthenticatedUser().then((user) =>{
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
    // @see https://aws-amplify.github.io/docs/js/authentication
    this.amplifyService.auth().signOut({ global: true })
    .then(data => {
      console.log(data)
      this.router.navigate(["/login"]);
    })
    .catch(err => console.log(err));
  }
}
