import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PC } from 'src/app/pc-model/pc.model';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pc-build-detail',
  templateUrl: './pc-build-detail.component.html',
  styleUrls: ['./pc-build-detail.component.css']
})
export class PcBuildDetailComponent implements OnInit, OnChanges {

  errorMessage: String

  showDelete: boolean;

  showConfirm: boolean;

  @Input() pc: PC

  @Output() editClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  cpu: Part

  cpuCooler: Part;

  gpu: Part;

  motherboard: Part;

  memory: Part;

  harddrive: Part;

  pcCase: Part;

  powersupply: Part;

  constructor(private service: PCService, private router: Router) {
    this.showDelete = true;
    this.showConfirm = false;
  }

  ngOnInit() {
    this.initParts()
  }

  editClickEvent() {
    this.editClicked.emit(true);
  }

  clickedDelete() {
    this.showDelete = false;
    this.showConfirm = true;
  }

  clickedConfirmDelete() {
    this.service.deletePC(this.pc).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/builds']);
      }
    );
  }

  clickedCancelDelete() {
    this.showDelete = true;
    this.showConfirm = false;
  }

  ngOnChanges(changes: SimpleChanges)  {
    this.initParts();
  }

  initParts() {
    this.service.getPartByID(this.pc.cpuID).subscribe(cpu =>
      this.cpu = cpu);

    this.service.getPartByID(this.pc.cpuCoolerID).subscribe(cpuCooler =>
      this.cpuCooler = cpuCooler);

    this.service.getPartByID(this.pc.gpuID).subscribe(gpu =>
      this.gpu = gpu);

    this.service.getPartByID(this.pc.motherboardID).subscribe(motherboard =>
      this.motherboard = motherboard);

    this.service.getPartByID(this.pc.memoryID).subscribe(memory =>
      this.memory = memory);

    this.service.getPartByID(this.pc.hardDriveID).subscribe(harddrive =>
      this.harddrive = harddrive);

    this.service.getPartByID(this.pc.pcCaseID).subscribe(pcCase =>
      this.pcCase = pcCase);

    this.service.getPartByID(this.pc.powersupplyID).subscribe(powersupply =>
      this.powersupply = powersupply);

  }

}
