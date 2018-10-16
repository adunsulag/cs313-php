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


@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    TherapistListComponent,
    ActivitylogListComponent
  ],
  imports: [
    BrowserModule
    ,HttpModule
    ,MDBBootstrapModules.forRoot()
  ],
  providers: [ActivitylogService, ClientService, TherapistService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
