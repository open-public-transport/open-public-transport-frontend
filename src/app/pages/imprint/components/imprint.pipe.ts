import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imprint'
})
export class ImprintPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
