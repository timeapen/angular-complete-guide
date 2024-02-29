import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): unknown {
    if (value.length === 0 || filterString === undefined || filterString.length === 0) {
      return value;
    }

    const result = [];
    for(const item of value) {
      if (item[propName] === filterString) {
        result.push(item);
      }
    }

    return result;
  }

}
