import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PC } from 'src/app/pc-model/pc.model';
import { PCService } from 'src/app/services/pc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pc-build-item',
  templateUrl: './pc-build-item.component.html',
  styleUrls: ['./pc-build-item.component.css']
})
export class PcBuildItemComponent implements OnInit {

  @Input() pc: PC;

  @Input() selectedPC: PC;

  @Output() selectedItemChanged: EventEmitter<PC> = new EventEmitter<PC>();


  constructor(private service: PCService) {

  }

  ngOnInit() {
  }


  listClick() {
    this.selectedItemChanged.emit(this.pc);
  }

 

}
