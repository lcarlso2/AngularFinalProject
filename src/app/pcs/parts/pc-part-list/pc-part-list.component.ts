import { Component, OnInit } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { PCService } from 'src/app/services/pc.service';

@Component({
  selector: 'app-pc-part-list',
  templateUrl: './pc-part-list.component.html',
  styleUrls: ['./pc-part-list.component.css']
})
export class ListPcPartComponent implements OnInit {

  parts: Part[]

  errorMessage: string;

  selectedPart: Part;
  
  constructor(private service: PCService) { 
    this.parts = [];
    
  }

  ngOnInit(): void {
    this.service.getParts().subscribe(parts => {
      this.parts = parts;
    },
    error => this.errorMessage = error
    );
  }

  onChildSelectedPartChanged(part: Part){
    this.selectedPart = part;
  }

}
