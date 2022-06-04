import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'um-ngx-bootstrap-modal',
  templateUrl: './ngx-bootstrap-modal.component.html',
  styleUrls: ['./ngx-bootstrap-modal.component.scss']
})
export class NgxBootstrapModalComponent implements OnInit {

  formGroup!: FormGroup

  constructor(private bsModalRef: BsModalRef,
              private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.buildForm();
  }

  hideDialogComponent(): void {
    this.bsModalRef.hide();
  }

  submitForm(): void {
    if(this.formGroup.invalid){
        this.formGroup.markAllAsTouched();

        return;
    }
  }

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
