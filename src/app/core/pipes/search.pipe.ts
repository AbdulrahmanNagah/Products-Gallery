import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], word : string): any[] {
    return value.filter((item) => item.title.toLowerCase().includes(word.toLowerCase()) );
  }

}
