import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PCService } from 'src/app/services/pc.service';

@Component({
  selector: 'app-create-pc-part',
  templateUrl: './create-pc-part.component.html',
  styleUrls: ['./create-pc-part.component.css']
})
export class CreatePcPartComponent implements OnInit {

  selectedPart: string;

  partForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PCService) {

  }

  ngOnInit() {
    this.partForm = this.formBuilder.group({
      id: new FormControl(
        '',
        [Validators.required]
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
      )
    })
  }

  get fields() {
    return this.partForm.controls;
  }

  onSubmit() {
    console.log(this.partForm.value)
  }

  partChanged() {
    console.log(this.selectedPart);
  }

}
