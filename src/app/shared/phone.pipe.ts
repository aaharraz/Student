import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: number) {
    if(value) {
      const newStr = '(' + value.toString().substr(0, 3) + ') ' + value.toString().substr(3, 3) + '-' + value.toString().substr(6) ;
      return newStr;

    } else {
      return null;
    }
  }

}

