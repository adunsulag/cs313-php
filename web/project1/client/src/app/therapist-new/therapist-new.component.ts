import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dac-therapist-new',
  templateUrl: './therapist-new.component.html',
  styleUrls: ['./therapist-new.component.scss']
})
export class TherapistNewComponent implements OnInit {

  public editItem:any;

  constructor() { 
    this.editItem = {};
  }

  ngOnInit() {
  }

}
