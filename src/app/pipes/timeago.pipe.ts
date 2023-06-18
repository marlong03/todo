import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {
  transform(value: Date ): string {
   try{
     return formatDistance(Date.now(), new Date(value));
    }catch(e){
      return ''
    }
  }
}
