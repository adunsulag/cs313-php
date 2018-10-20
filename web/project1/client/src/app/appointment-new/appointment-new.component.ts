import { Component, OnInit } from '@angular/core';
import { TherapistService } from '../services/therapist.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'dac-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.scss']
})
export class AppointmentNewComponent implements OnInit {

  public hasLoaded:boolean;
  public editItem:any;
  private _appointment:any;
  private _therapists:any[];
  private _clients:any[];

  constructor(private therapistService:TherapistService
    , private clientService:ClientService) { 
    this._appointment = {};
    this._therapists = [];
    this._clients = [];
    this.editItem = {};
  }

  ngOnInit() {
    this.hasLoaded = false;
    let therapistsPromise = this.therapistService.list().then((therapists) => {
      this._therapists = therapists;
    });

    let clientsPromise = this.clientService.list().then((clients) => {
      this._clients = clients;
    });
    Promise.all([therapistsPromise, clientsPromise]).then((results) =>{
      this.hasLoaded = true;
    })
    .catch(error => {
      this.hasLoaded = true;
      console.error(error);
    });

  }

  public get statii() {
    return ['pending', 'canceled', 'noshow', 'completed'];
  }

  public get therapists() {
    return this._therapists;
  }

  public get clients() {
    return this._clients;
  }

}
