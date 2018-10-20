import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MDBBootstrapModules } from 'ng-mdb-pro';

import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { TherapistListComponent } from './therapist-list/therapist-list.component';
import { ActivitylogListComponent } from './activitylog-list/activitylog-list.component';
import { ActivitylogService } from './services/activitylog.service';
import { ClientService } from './services/client.service';
import { TherapistService } from './services/therapist.service';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AppointmentService } from './services/appointment.service';


@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    TherapistListComponent,
    ActivitylogListComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule
    ,HttpModule
    ,FormsModule
    ,AmplifyAngularModule
    ,MDBBootstrapModules.forRoot()
    ,AppRoutingModule
  ],
  providers: [ActivitylogService, ClientService, TherapistService, HttpService, AmplifyService, AppointmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
