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
    var pc = new PC(+this.fields.id.value,
      this.fields.name.value, +this.fields.gpu.value, +this.fields.cpu.value, 
      +this.fields.cpuCooler.value, +this.fields.motherboard.value, 
      +this.fields.memory.value, +this.fields.harddrive.value, +this.fields.case.value, 
      +this.fields.powersupply.value, this.fields.description.value)

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
        this.pcToEdit.cpuID,
        [Validators.required]
      ),
      cpuCooler: new FormControl(
        this.pcToEdit.cpuCoolerID,
        [Validators.required]
      ),
      gpu: new FormControl(
        this.pcToEdit.gpuID,
        [Validators.required]
      ),
      memory: new FormControl(
        this.pcToEdit.memoryID,
        [Validators.required]
      ),
      powersupply: new FormControl(
        this.pcToEdit.powersupplyID,
        [Validators.required]
      ),
      motherboard: new FormControl(
        this.pcToEdit.motherboardID,
        [Validators.required]
      ),
      case: new FormControl(
        this.pcToEdit.pcCaseID,
        [Validators.required]
      ),
      description: new FormControl(
        this.pcToEdit.description,
        [Validators.required]
      ),
      harddrive: new FormControl(
        this.pcToEdit.hardDriveID,
        [Validators.required]
      )
    })
  }





}
