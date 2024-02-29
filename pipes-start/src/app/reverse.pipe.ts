import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var asString: string = value as string;
    var asArray: string[] = asString.split('');

    return asArray.reverse().join('');
  }

}
