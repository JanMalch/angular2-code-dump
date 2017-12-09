import { person } from './person';

@Component({
  selector: 'my-app',
  template: `
    <dynamic-form [dataObject]="person"></dynamic-form>
  `
})
export class AppComponent {
  person;

  constructor() {
    this.person = person;
  }
}