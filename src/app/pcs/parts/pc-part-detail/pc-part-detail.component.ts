import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';
import { Router } from '@angular/router';
import { PC } from 'src/app/pc-model/pc.model';

@Component({
  selector: 'app-pc-part-detail',
  templateUrl: './pc-part-detail.component.html',
  styleUrls: ['./pc-part-detail.component.css']
})
export class PcPartDetailComponent implements OnInit {

  @Input() part: Part;

  @Output() editClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  type: string;

  showDelete: boolean;

  showConfirm: boolean;

  partInBuild: boolean;

  constructor(private service: PCService, private router: Router) {
    this.partInBuild = false;
    this.showDelete = true;
    this.showConfirm = false;
  }

  ngOnInit() {
    this.type = Part.convertEnumTypeToString(this.part.type);
  }

  editClickEvent() {
    this.editClicked.emit(true);
  }

  clickedDelete() {
    this.service.getPCS().subscribe(pcs => {
      pcs.filter(currPC => {
        var pc = new PC(currPC.id, currPC.name, currPC.gpuID, currPC.cpuID, currPC.cpuCoolerID,
          currPC.motherboardID, currPC.memoryID, currPC.hardDriveID,
          currPC.pcCaseID, currPC.powersupplyID, currPC.description)

        if (pc.checkIfPCContainsPartIDNumber(this.part.id)) {
          this.partInBuild = true;
        }
        this.showDelete = false;
        this.showConfirm = true;
      })
    });
  }

  clickedConfirmDelete() {
    this.service.deletePart(this.part).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/parts', { type: this.part.type }]);
      }
    );
  }

  clickedCancelDelete() {
    this.partInBuild = false;
    this.showDelete = true;
    this.showConfirm = false;
  }

}
