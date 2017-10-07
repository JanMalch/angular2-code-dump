import {foo} from "../global-functions";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    foo("Hello from DemoComponent!");
  }
}
