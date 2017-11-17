import {Component, HostListener, OnInit} from '@angular/core';


@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

	@HostListener('window:keydown', ['$event'])
	private onKeyDown($event) {
		if($event.keyCode >= 48 && $event.keyCode <= 57) {
			// Zahl
		}
		
		if( $event.keyCode >= 65 && $event.keyCode <= 90) { 
			// Buchstabe
		}
	}
}
