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
      ),
      description: new FormControl(
        '',
        [Validators.required]
      ),
      harddrive: new FormControl(
        '',
        [Validators.required]
      )
    })
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

    this.service.createPC(pc).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/builds']);
      }
    );

  }

  idValidator(ctrl: AbstractControl): Promise<ValidationErrors | boolean> | Observable<ValidationErrors | boolean> {
    return this.service.checkIfIdExistsForPC(ctrl.value).pipe(map(isTaken => (isTaken ? { idTaken: true } : null)),
      catchError(() => of(false))
    );
  }

}
