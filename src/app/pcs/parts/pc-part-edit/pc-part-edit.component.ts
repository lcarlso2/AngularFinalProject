import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { ValidationErrors, AbstractControl, Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PCService } from 'src/app/services/pc.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-pc-part-edit',
  templateUrl: './pc-part-edit.component.html',
  styleUrls: ['./pc-part-edit.component.css']
})
export class EditPcPartComponent implements OnInit, OnChanges {

  selectedPart: string;

  partForm: FormGroup;

  @Input() partToEdit: Part;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PCService) {
  }

  ngOnInit() {
    this.initPartForm();
  }

  get fields() {
    return this.partForm.controls;
  }

  onSubmit() {
    var part = new Part(this.fields.id.value,
      Part.convertStringToEnumType(this.fields.partType.value),
      this.fields.brand.value,
      this.fields.model.value,
      this.fields.description.value);
    this.service.editPart(part).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.partToEdit = changes.partToEdit.currentValue;
    this.initPartForm();
  }

  initPartForm() {
    this.partForm = this.formBuilder.group({
      id: new FormControl(
        { value: this.partToEdit.id, disabled: true },
        [Validators.required],
      ),
      brand: new FormControl(
        this.partToEdit.brand,
        [Validators.required]
      ),
      model: new FormControl(
        this.partToEdit.model,
        [Validators.required]
      ),
      description: new FormControl(
        this.partToEdit.description,
        [Validators.required]
      ),
      partType: new FormControl(
        { value: Part.convertEnumTypeToString(this.partToEdit.type), disabled: true },
        [Validators.required]
      )
    });
  }


}
