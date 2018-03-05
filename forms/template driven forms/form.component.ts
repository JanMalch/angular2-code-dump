import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  name: string = "John Doe";

  // remember to import FormsModule in your module
  constructor() { }

  ngOnInit() {
  }

  register (myForm: NgForm) {
    console.log('Successful registration');
    console.log(myForm);
  }

}
