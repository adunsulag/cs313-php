import { Component, OnInit } from '@angular/core';
import { ActivitylogService } from '../services/activitylog.service';

@Component({
  selector: 'dac-activitylog-list',
  templateUrl: './activitylog-list.component.html',
  styleUrls: ['./activitylog-list.component.css']
})
export class ActivitylogListComponent implements OnInit {
  public logs:any[];

  constructor(private activityLogService:ActivitylogService) { 
    this.logs = [];
  }

  ngOnInit() {
    this.activityLogService.list().then((logs) => {
      console.log(logs);
      this.logs = logs;
    });
  }

}
