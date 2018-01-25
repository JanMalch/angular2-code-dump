import { person } from './person';

@Component({
  selector: 'my-app',
  template: `
    <dynamic-form></dynamic-form>
  `
})
export class AppComponent {

	// SOURCE: https://alligator.io/angular/reactive-forms-introduction/

  constructor() {
  }
}