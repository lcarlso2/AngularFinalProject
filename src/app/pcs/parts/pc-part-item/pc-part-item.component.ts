import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';
import { Router } from '@angular/router';
import { PC } from 'src/app/pc-model/pc.model';

@Component({
  selector: 'app-pc-part-item',
  templateUrl: './pc-part-item.component.html',
  styleUrls: ['./pc-part-item.component.css']
})
export class PCPartItemComponent implements OnInit {

  @Input() part: Part;

  @Input() selectedPart: Part;

  @Output() selectedItemChanged: EventEmitter<Part> = new EventEmitter<Part>();

  showDelete: boolean;
  showConfirm: boolean;
  partInBuild: boolean;

  constructor(private service: PCService, private router: Router) {
    this.partInBuild = false;
    this.showDelete = true;
    this.showConfirm = false;
  }

  ngOnInit() {
  }

  getPartType(): string {
    return Part.convertEnumTypeToString(this.part.type);
  }

  listClick() {
    this.selectedItemChanged.emit(this.part);
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
