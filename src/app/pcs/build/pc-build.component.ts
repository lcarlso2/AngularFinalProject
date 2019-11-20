import { Component, OnInit } from '@angular/core';
import { PCService } from 'src/app/services/pc.service';
import { PC } from 'src/app/pc-model/pc.model';
import { Part } from 'src/app/part-model/pc-part.model';


@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.css']
})
export class PcBuildComponent implements OnInit {

  pcs: PC[]
  
  errorMessage: string;
  
  constructor(private service: PCService) {
  }

  ngOnInit() {
    this.service.getPCS().subscribe(pcs => {
      this.pcs = pcs;
    },
      error => this.errorMessage = error
    );
  }

}
