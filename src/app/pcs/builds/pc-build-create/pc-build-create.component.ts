import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PCService } from 'src/app/services/pc.service';
import { Observable, of } from 'rxjs';
import { catchError, map, partition } from 'rxjs/operators';
import { PC } from 'src/app/pc-model/pc.model';
import { Part } from 'src/app/part-model/pc-part.model';
import { PART_TYPE } from 'src/app/part-model/part-enum.model';

@Component({
  selector: 'app-pc-build-create',
  templateUrl: './pc-build-create.component.html',
  styleUrls: ['./pc-build-create.component.css']
})
export class PcBuildCreateComponent implements OnInit {

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
    this.pcForm = this.formBuilder.group({
      id: new FormControl(
        '',
        [Validators.required],
        [this.idValidator.bind(this)]
      ),
      name: new FormControl(
        '',
        [Validators.required]
      ),
      cpu: new FormControl(
        '',
        [Validators.required]
      ),
      cpuCooler: new FormControl(
        '',
        [Validators.required]
      ),
      gpu: new FormControl(
        '',
        [Validators.required]
      ),
      memory: new FormControl(
        '',
        [Validators.required]
      ),
      powersupply: new FormControl(
        '',
        [Validators.required]
      ),
      motherboard: new FormControl(
        '',
        [Validators.required]
      ),
      case: new FormControl(
        '',
        [Validators.required]
      )
    })
  }

  get fields() {
    return this.pcForm.controls;
  }

  onSubmit() {
    var cpu = this.parts.filter(curr => {
    curr.id === +this.fields.cpu.value;
    console.log(typeof(curr.id))
    });
    console.log(typeof(this.fields.cpu.value));
    console.log(typeof(+this.fields.cpu.value));
    console.log(cpu)

    console.log((3 === +'3'))

  }

  idValidator(ctrl: AbstractControl): Promise<ValidationErrors | boolean> | Observable<ValidationErrors | boolean> {
    return this.service.checkIfIdExistsForPC(ctrl.value).pipe(map(isTaken => (isTaken ? { idTaken: true } : null)),
      catchError(() => of(false))
    );
  }

}
