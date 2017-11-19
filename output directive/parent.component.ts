import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
	templateUrl: './parent.component.html',
	styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {

  constructor() {
  }
  
  handleInfo(greeting: string) {
	if(greeting === "I am your child!") {
		alert("Noooooooooooooooo!");
	} else {
		alert("Phew!");
	}
  }
}