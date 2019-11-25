import { Component, OnInit } from '@angular/core';
import { PCService } from 'src/app/services/pc.service';
import { PC } from 'src/app/pc-model/pc.model';
import { Part } from 'src/app/part-model/pc-part.model';


@Component({
  selector: 'app-pc-build-list',
  templateUrl: './pc-build-list.component.html',
  styleUrls: ['./pc-build-list.component.css']
})
export class PCBuildListComponent implements OnInit {

  pcs: PC[]
  
  errorMessage: string;

  selectedPC: PC;

  createPC: boolean;

  editClicked: boolean;
  
  constructor(private service: PCService) {
    this.editClicked = false;
    this.createPC = false;
  }

  ngOnInit() {
    this.service.getPCS().subscribe(pcs => {
      this.pcs = pcs;
    },
      error => this.errorMessage = error
    );
  }

  
  onChildSelectedPCChanged(pc: PC) {
    this.editClicked = false;
    this.selectedPC = pc;
  }

  createPCClicked() {
    this.selectedPC = null;
    this.editClicked = false;
    this.createPC = true;
  }

  childEditClicked() {
    this.editClicked = true;
  }

}
