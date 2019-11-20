import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, DoCheck } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pc-part-list',
  templateUrl: './pc-part-list.component.html',
  styleUrls: ['./pc-part-list.component.css']
})
export class ListPcPartComponent implements OnInit {
  selectedPartType: string;

  selectedPartTypeNumber: number;

  parts: Part[]

  errorMessage: string;

  selectedPart: Part;

  createPart: boolean;


  constructor(private service: PCService, private router: Router) {
    this.createPart = false;
    this.parts = [];
  }

  ngOnInit(): void {
    this.service.getParts().subscribe(parts => {
      this.parts = parts;
    },
      error => this.errorMessage = error
    );
  }

  onChildSelectedPartChanged(part: Part) {
    this.selectedPart = part;
    console.log(this.selectedPart)
  }

  selectedPartTypeChanged() {
    this.selectedPartTypeNumber = Part.convertStringToEnumType(this.selectedPartType);
  }

  createPartClicked() {
    this.selectedPart = null;
    this.createPart = true;
  }




  

}
