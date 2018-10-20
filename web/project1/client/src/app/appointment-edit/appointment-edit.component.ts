import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TherapistService } from '../services/therapist.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'dac-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  public hasLoaded:boolean;
  private _appointment:any;
  private _therapists:any[];
  private _clients:any[];

  constructor(private route:ActivatedRoute, private router:Router
    , private apptService:AppointmentService
    , private therapistService:TherapistService
    , private clientService:ClientService) { 
    this._appointment = {};
    this._therapists = [];
    this._clients = [];
  }

  ngOnInit() {
    this.hasLoaded = false;

    this.route.params.subscribe(params => {
      if (!params['id'] || isNaN(+params['id'])) {
        this.router.navigate(['/page-not-found']);
        return;
      }
      let therapistsPromise = this.therapistService.list().then((therapists) => {
        this._therapists = therapists;
      });

      let clientsPromise = this.clientService.list().then((clients) => {
        this._clients = clients;
      });

      let id = +params['id'];
      let apptProfilePromise = this.apptService.get(id).then((appointment) => {
        this._appointment = appointment;
      });

      Promise.all([therapistsPromise, clientsPromise, apptProfilePromise]).then((results) =>{
        this.hasLoaded = true;
      })
      .catch(error => {
        this.hasLoaded = true;
        console.error(error);
      });
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

  public get editItem() {
    return this._appointment || {};
  }

}