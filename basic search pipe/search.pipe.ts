import { Pipe, PipeTransform } from '@angular/core';
import { Person } from "./app.component";

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item =>
          item.name !== filter);
  }

}
