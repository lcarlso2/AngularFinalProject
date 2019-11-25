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


  constructor(private service: PCService, private router: Router) {
  }

  ngOnInit() {
  }

  getPartType(): string {
    return Part.convertEnumTypeToString(this.part.type);
  }

  listClick() {
    this.selectedItemChanged.emit(this.part);
  }

 





}
