import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
	templateUrl: './child.component.html',
	styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Output() updated = new EventEmitter();
  private greeting: string = "I am your child!";

  constructor() {
  }
  
  notifyParent() {
	this.updated.emit(this.greeting);
  }
}