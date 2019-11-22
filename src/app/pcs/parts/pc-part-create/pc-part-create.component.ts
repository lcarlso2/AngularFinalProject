import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { PCService } from 'src/app/services/pc.service';
import { PART_TYPE } from 'src/app/part-model/part-enum.model';
import { Part } from 'src/app/part-model/pc-part.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-pc-part-create',
  templateUrl: './pc-part-create.component.html',
  styleUrls: ['./pc-part-create.component.css']
})
export class PCPartCreateComponent implements OnInit {

  selectedPart: string;

  partForm: FormGroup;

  @Output() partCreated: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PCService) {

  }

  ngOnInit() {
    this.partForm = this.formBuilder.group({
      id: new FormControl(
        '',
        [Validators.required],
        [this.idValidator.bind(this)]
      ),
      brand: new FormControl(
        '',
        [Validators.required]
      ),
      model: new FormControl(
        '',
        [Validators.required]
      ),
      description: new FormControl(
        '',
        [Validators.required]
      ),
      partType: new FormControl(
        '',
        [Validators.required]
      )
    })
  }

  get fields() {
    return this.partForm.controls;
  }

  onSubmit() {
    var part = new Part(+this.fields.id.value,
      Part.convertStringToEnumType(this.fields.partType.value),
      this.fields.brand.value,
      this.fields.model.value,
      this.fields.description.value);
    this.service.createPart(part).subscribe(
      () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/parts', { type: part.type }]);
      }
    );
    this.partCreated = true;
  }

  idValidator(ctrl: AbstractControl): Promise<ValidationErrors | boolean> | Observable<ValidationErrors | boolean> {
    return this.service.checkIfIdExistsForParts(ctrl.value).pipe(map(isTaken => (isTaken ? { idTaken: true } : null)),
      catchError(() => of(false))
    );
  }


}
