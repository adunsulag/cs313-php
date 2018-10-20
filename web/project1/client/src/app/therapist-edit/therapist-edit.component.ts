import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TherapistService } from '../services/therapist.service';

@Component({
  selector: 'dac-therapist-edit',
  templateUrl: './therapist-edit.component.html',
  styleUrls: ['./therapist-edit.component.scss']
})
export class TherapistEditComponent implements OnInit {

  public hasLoaded:boolean;
  public _therapist:any;
  constructor(private route:ActivatedRoute, private router:Router, private therapistService:TherapistService) { 
    this._therapist = {
      logs: [],
      appointments: []
    };
  }

  ngOnInit() {
    this.hasLoaded = false;
    this.route.params.subscribe(params => {
      if (!params['id'] || isNaN(+params['id'])) {
        this.router.navigate(['/page-not-found']);
        return;
      }
      let id = +params['id'];
      this.therapistService.get(id).then((therapist) => {
        this._therapist = therapist;
        this.hasLoaded = true;
      })
      .catch((error) => {
        console.error(error);
        this.hasLoaded = true;
      })
    });
  }

  public get editItem() {
    return this._therapist || { logs: [], appointments: []};
  }

}
