import { Component, OnInit } from '@angular/core';
import { ActivitylogService } from '../services/activitylog.service';

@Component({
  selector: 'dac-activitylog-list',
  templateUrl: './activitylog-list.component.html',
  styleUrls: ['./activitylog-list.component.css']
})
export class ActivitylogListComponent implements OnInit {
  public logs:any[];
  public entities:string[] = [
    ""
    ,"SystemUser"
    ,"Client"
    ,"Therapist"
    ,"Appointment"
  ];
  private _searchFilter:any;

  constructor(private activityLogService:ActivitylogService) { 
    this.logs = [];
    this._searchFilter = {
      searchEntity: ""
    };
  }

  public get searchFilter() {
    return this._searchFilter;
  }

  public set searchFilter(v:any) {
    this._searchFilter = v;
  }

  public filter() {
    if (!this.searchFilter || this.searchFilter == "") {
      return this.reset();
    }
    
    this.activityLogService.search(this.searchFilter.filter).then(logs => this.setLogs(logs));
  }
  public reset() {
    this.activityLogService.list().then(logs => this.setLogs(logs));
  }

  private setLogs(logs) {
    console.log("Logs are now: ", logs);
      this.logs = logs;
  }

  ngOnInit() {
    this.activityLogService.list().then(logs => this.setLogs(logs));
  }

}
