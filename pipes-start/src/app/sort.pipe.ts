import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any[], propName: string): unknown {
    if (value.length === 0) {
      return value;
    }

    return value.sort(compare(propName))
  }

}

function compare(propName: string): (a: any, b: any) => number {
  return (a, b) => {
    console.debug(a);
    console.debug(b);
    return a[propName] > b[propName] ? 1 : (a[propName] < b[propName] ? -1 : 0)
  };
}
