import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'dac-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  public appointments:any;
  public hasLoaded:boolean;

  constructor(private apptService:AppointmentService) { 
    this.appointments = [];
  }

  ngOnInit() {
    this.hasLoaded = false;
    this.apptService.list().then((appointments) => {
      console.log(appointments);
      this.appointments = appointments;
      this.hasLoaded = true;
    })
    .catch((error) => {
      console.error(error);
      this.hasLoaded = true;
    });
  }

}
