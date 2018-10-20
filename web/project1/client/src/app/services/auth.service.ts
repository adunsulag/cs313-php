import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import {awsmobile} from "../../aws-exports";
import { AuthState } from 'aws-amplify-angular/dist/src/providers/auth.state';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {
  public changeSubject:Subject<{state: string, user:any}>;
  private _inAuthentication:boolean;

  constructor(private amplifyService: AmplifyService, private http:HttpService) { 
    this.changeSubject = new Subject<{state: string, user:any}>();
    // TODO: stephen look at pulling all of the amplify stuff into this file.
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
    this.amplifyService.authStateChange$.subscribe(authState => {
      if (authState.state == 'signedIn') {
        let syncUserData = authState.user.signInUserSession.idToken;
        if (!this._inAuthentication) {
          this._inAuthentication = true;
          this.http.post('users.login', syncUserData)
          .then((result) => {
            this._inAuthentication = false;
            this.changeSubject.next({state: authState.state, user: authState.user});
          })
          .catch((error) => {
            console.error(error);
            this.changeSubject.next({state: 'error', user: null});
          });
        }
      }
     
    });
  }

  public signOut() {
    let systemSignout = this.http.post('users.logout');
     // @see https://aws-amplify.github.io/docs/js/authentication
    let amplifySignout = this.amplifyService.auth().signOut({ global: true });
    return Promise.all([systemSignout, amplifySignout]);
  }

  public authStateChange() : Subject<{state: string, user:any}>{
    return this.changeSubject;
  }

  public currentAuthenticatedUser() {
    return this.amplifyService.auth().currentAuthenticatedUser();
  }

  private setup

}
