import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pc-build-edit',
  templateUrl: './pc-build-edit.component.html',
  styleUrls: ['./pc-build-edit.component.css']
})
export class PcBuildEditComponent implements OnInit {

  @Input() pcToEdit;

  constructor() { }

  ngOnInit() {
  }

}
