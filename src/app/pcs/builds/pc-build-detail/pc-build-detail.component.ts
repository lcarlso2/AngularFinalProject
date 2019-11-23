import { Component, OnInit, Input, Output } from '@angular/core';
import { PC } from 'src/app/pc-model/pc.model';

@Component({
  selector: 'app-pc-build-detail',
  templateUrl: './pc-build-detail.component.html',
  styleUrls: ['./pc-build-detail.component.css']
})
export class PcBuildDetailComponent implements OnInit {

  @Input() pc: PC
  
  @Output() editClicked: boolean


  constructor() { }

  ngOnInit() {
  }

}
