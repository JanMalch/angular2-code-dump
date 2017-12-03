import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAnyArray'
})
export class SortAnyArrayPipe implements PipeTransform {

  transform(array: any[], propertyName: string): any[] {
  	if(!array || !propertyName) return array;

    return array.sort((a, b) => {
    	if( a[propertyName] < b[propertyName] ) return -1;
		if( a[propertyName] > b[propertyName] ) return 1;
		return 0;
	});
  }

}
