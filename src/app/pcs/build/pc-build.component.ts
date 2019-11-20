import { Component, OnInit } from '@angular/core';
import { PCService } from 'src/app/services/pc.service';
import { PC } from 'src/app/pc/pc.model';
import { Part } from 'src/app/parts/pc-part.model';


@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.css']
})
export class PcBuildComponent implements OnInit {

  pcs: PC[]
  errorMessage: string;
  
  constructor(private service: PCService) {

    var gpu = new Part(1, 2,"MSI", "1050", "4GB video ram");
    var cpu = new Part(1, 0, "Intel", "i7-9700k", "2.6 GHz 8-Core processor")
    var pcCase = new Part(1, 7, "Phanteks", "P300", "A mid ATX tower case")
    var cpuCooler = new Part(1, 1, "Cooler Master", "Hyper 212", "The RGB Black edition")
    var memory = new Part(1, 4, "Corsair", "Vengeance LPX", "16GB (2 x 8GB) DDR4-3600")
    var mobo = new Part(1, 5, "MSI", "Z390", "ATX LGA1151 Motherboard")
    var psu = new Part(1, 6, "Corsair", "TXM", "Gold 550 W 80+")
    var hardDrive = new Part(1, 3, "Wester Digital", "Caviar Blue", "1TB 7200 RPM")
    this.pcs = [new PC(1, "My first build", gpu, cpu, cpuCooler, mobo, memory, hardDrive, pcCase, psu, "This is my first build.")];

    console.log(JSON.stringify(this.pcs))
  }

  ngOnInit() {
    this.service.getPCS().subscribe(pcs => {
      this.pcs = pcs;
    },
      error => this.errorMessage = error
    );
  }

}
