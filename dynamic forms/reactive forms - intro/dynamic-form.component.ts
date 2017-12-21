import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

// SOURCE: https://alligator.io/angular/reactive-forms-introduction/

  myForm: FormGroup;

   constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
    name: ['Benedict', Validators.required],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
    message: ['', [Validators.required, Validators.minLength(15)]]
  });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}


