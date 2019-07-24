import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../services/hive.service';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveSection } from '../models/hive-section';
import { HiveListItem } from '../models/hive-list-item';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveId: number;
  hiveSection = new HiveSection(0, "", "", false, "", 0);
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {    
      //if (p['storeHiveId'] === undefined) return;
      if (p['id'] === undefined) {
        this.hiveSection.storeHiveId = p['storeHiveId'];
        this.existed = true;
        console.log(1);
        return;
      }
      this.hiveSectionService.getHiveSection(p['id']).subscribe(h => {
        this.hiveSection = h;
        this.hiveSection.storeHiveId = p['storeHiveId'];
        console.log(2);
      });
      this.existed = true;
      this.hiveId = p['storeHiveId'];
      console.log(3);
    });
  }

  navigateToHiveSections() {
    this.router.navigate([`/hive/${this.hiveSection.storeHiveId}/sections`]);
  }

  onCancel() {
    this.navigateToHiveSections();
  }

  onSubmit() {
    if (this.hiveSection.id != 0) {
      this.hiveSection.storeHiveId = this.hiveId;
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(s => this.navigateToHiveSections());
    } else {
      //this.hiveSection.storeHiveId = this.hiveId;
      this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(s => this.navigateToHiveSections());
    }
    //if (this.existed) {
    //  this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(s => this.navigateToHiveSections());
    //} else {
    //  this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(s => this.navigateToHiveSections());
    //}
  }

  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe(s => this.hiveSection.isDeleted = true);
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(s => this.hiveSection.isDeleted = false);
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(s => this.navigateToHiveSections());
    //this.existed = false;
  }
}
