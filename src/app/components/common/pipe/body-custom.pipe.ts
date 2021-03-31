import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bodyCustom'
})
export class BodyCustomPipe implements PipeTransform {

  transform(value: string, limit: number, ...args: unknown[]) {
    limit = limit || 250

    if (value.length < limit) { return value }
    return value.substr(0, limit) + '...';
  }

}
