import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string, count : number = 2): string {
    return value.split(" ", count).join(" ");
  }

}
