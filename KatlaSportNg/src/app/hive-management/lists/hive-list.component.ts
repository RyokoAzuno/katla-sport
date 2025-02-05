import { Component, OnInit } from '@angular/core';
import { HiveListItem } from '../models/hive-list-item';
import { HiveService } from '../services/hive.service';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.css']
})
export class HiveListComponent implements OnInit {

  hives: Array<HiveListItem>;

  constructor(private hiveService: HiveService) { }

  ngOnInit() {
    this.getHives();
  }

  fillDeletedItems() {
    this.getHives();
  }

  getHives() {
    this.hiveService.getHives().subscribe(h => this.hives = h);
  }

  onDelete(hiveId: number) {
    console.log("onDelete");
    var hive = this.hives.find(h => h.id == hiveId);
    this.hiveService.setHiveStatus(hiveId, true).subscribe(h => hive.isDeleted = true);
  }

  onRestore(hiveId: number) {
    console.log("onRestore");
    var hive = this.hives.find(h => h.id == hiveId);
    this.hiveService.setHiveStatus(hiveId, false).subscribe(h => hive.isDeleted = false);
  }
}
