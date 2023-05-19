import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], filterString: string): any {
  
    const result: any = [];
    if (!value || filterString === '') {
      return value;
    }
    value.forEach((a: any) => {
      for(let key in a) {
      if (a[key]&&a[key].toString().toLowerCase().includes(filterString.toLowerCase())) {
        result.push(a);
      }
    }
    });
    return result;
  }

}
