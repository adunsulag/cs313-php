import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dac-appointment-list-table',
  templateUrl: './appointment-list-table.component.html',
  styleUrls: ['./appointment-list-table.component.scss']
})
export class AppointmentListTableComponent implements OnInit {

  @Input() appointments:any[];
  
  constructor() { 
    this.appointments = [];
  }

  ngOnInit() {
  }

  public get Appointments() {
    if (this.appointments && this.appointments.length > 0) {
      return this.appointments;
    }
    return [];
  }

}
