import { Component, OnInit, Input } from '@angular/core';
import { Part } from 'src/app/part-model/pc-part.model';
import { ValidationErrors, AbstractControl, Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PCService } from 'src/app/services/pc.service';

@Component({
  selector: 'app-pc-part-edit',
  templateUrl: './pc-part-edit.component.html',
  styleUrls: ['./pc-part-edit.component.css']
})
export class EditPcPartComponent implements OnInit {

  selectedPart: string;

  partForm: FormGroup;

  @Input() partToEditID: number;

  partToEdit: Part;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PCService) {
  
  }

  ngOnInit() {
    this.partForm = this.formBuilder.group({
      id: new FormControl(
        {value: '', disabled : true},
        [Validators.required],
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
        {value: '', disabled : true},
        [Validators.required]
      )
    });
    this.service.getPartByID(this.partToEditID).subscribe(part => {
      this.partToEdit = part;
      this.fields.id.setValue(this.partToEdit.id);
      this.fields.brand.setValue(this.partToEdit.brand);
      this.fields.model.setValue(this.partToEdit.model);
      this.fields.description.setValue(this.partToEdit.description);
      this.fields.partType.setValue(Part.convertEnumTypeToString(this.partToEdit.type));
    }
    );


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
    this.service.createPart(part);
  }


}
