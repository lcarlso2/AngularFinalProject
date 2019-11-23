import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, DoCheck } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pc-part-list',
  templateUrl: './pc-part-list.component.html',
  styleUrls: ['./pc-part-list.component.css']
})
export class PCPartListComponent implements OnInit {
  selectedPartType: string;

  selectedPartTypeNumber: number;

  parts: Part[]

  errorMessage: string;

  selectedPart: Part;

  createPart: boolean;


  constructor(private service: PCService, private router: Router, private route: ActivatedRoute) {
    this.createPart = false;
    this.parts = [];
  }

  ngOnInit(): void {
    this.selectedPartTypeNumber = +this.route.snapshot.paramMap.get('type');
    this.selectedPartType = Part.convertEnumTypeToString(this.selectedPartTypeNumber)
    this.service.getParts().subscribe(parts => {
      this.parts = parts;
    },
      error => this.errorMessage = error
    );
  }

  onChildSelectedPartChanged(part: Part) {
    this.selectedPart = part;
  }

  selectedPartTypeChanged() {
    this.selectedPartTypeNumber = Part.convertStringToEnumType(this.selectedPartType);
  }

  createPartClicked() {
    this.selectedPart = null;
    this.createPart = true;
  }






}
