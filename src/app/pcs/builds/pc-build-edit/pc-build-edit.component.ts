import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PART_TYPE } from 'src/app/part-model/part-enum.model';
import { Part } from 'src/app/part-model/pc-part.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PCService } from 'src/app/services/pc.service';
import { PC } from 'src/app/pc-model/pc.model';

@Component({
  selector: 'app-pc-build-edit',
  templateUrl: './pc-build-edit.component.html',
  styleUrls: ['./pc-build-edit.component.css']
})
export class PcBuildEditComponent implements OnInit, OnChanges {
  
  @Input() pcToEdit;

  cpuType: number = PART_TYPE.CPU

  cpuCoolerType: number = PART_TYPE.CPUCooler

  gpuType: number = PART_TYPE.GPU

  harddriveType: number = PART_TYPE.HardDrive

  motherboardType: number = PART_TYPE.Motherboard

  memoryType: number = PART_TYPE.Memory

  powerSupplyType: number = PART_TYPE.PowerSupply

  caseType: number = PART_TYPE.PCCase


  parts: Part[];

  pcForm: FormGroup;

  errorMessage: string;

  @Output() pcCreated: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PCService) {
    this.parts = [];
  }

  ngOnInit() {
    this.service.getParts().subscribe(parts => {
      this.parts = parts;
    },
      error => this.errorMessage = error
    );
    this.initFormPC();
  }

  get fields() {
    return this.pcForm.controls;
  }

  onSubmit() {
    var cpu = this.parts.find(curr =>
      curr.id === +this.fields.cpu.value
    );
    var cpuCooler = this.parts.find(curr =>
      curr.id === +this.fields.cpuCooler.value
    );
    var gpu = this.parts.find(curr =>
      curr.id === +this.fields.gpu.value
    );
    var memory = this.parts.find(curr =>
      curr.id === +this.fields.memory.value
    );
    var powerSupply = this.parts.find(curr =>
      curr.id === +this.fields.powersupply.value
    );
    var motherboard = this.parts.find(curr =>
      curr.id === +this.fields.motherboard.value
    );
    var pcCase = this.parts.find(curr =>
      curr.id === +this.fields.case.value
    );

    var harddrive = this.parts.find(curr =>
      curr.id === +this.fields.harddrive.value
    );

    var pc = new PC(+this.fields.id.value,
       this.fields.name.value, gpu, cpu, 
       cpuCooler, motherboard, 
       memory, harddrive, pcCase, 
       powerSupply, this.fields.description.value)

    this.service.editPC(pc).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/builds']);
      }
    );

  }

  ngOnChanges(changes: SimpleChanges)  {
    this.pcToEdit = changes.pcToEdit.currentValue;
    this.initFormPC();
  }


  initFormPC(){
    console.log(this.pcToEdit)
    this.pcForm = this.formBuilder.group({
      id: new FormControl(
        {value : this.pcToEdit.id, disabled: true},
        [Validators.required]
      ),
      name: new FormControl(
        this.pcToEdit.name,
        [Validators.required]
      ),
      cpu: new FormControl(
        this.pcToEdit.cpu.id,
        [Validators.required]
      ),
      cpuCooler: new FormControl(
        this.pcToEdit.cpuCooler.id,
        [Validators.required]
      ),
      gpu: new FormControl(
        this.pcToEdit.gpu.id,
        [Validators.required]
      ),
      memory: new FormControl(
        this.pcToEdit.memory.id,
        [Validators.required]
      ),
      powersupply: new FormControl(
        this.pcToEdit.powersupply.id,
        [Validators.required]
      ),
      motherboard: new FormControl(
        this.pcToEdit.motherboard.id,
        [Validators.required]
      ),
      case: new FormControl(
        this.pcToEdit.pcCase.id,
        [Validators.required]
      ),
      description: new FormControl(
        this.pcToEdit.description,
        [Validators.required]
      ),
      harddrive: new FormControl(
        this.pcToEdit.hardDrive.id,
        [Validators.required]
      )
    })
  }





}
