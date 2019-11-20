import { Pipe, PipeTransform } from '@angular/core';
import { Part } from '../part-model/pc-part.model';
import { PART_TYPE } from '../part-model/part-enum.model';

@Pipe({
    name: 'partTypePipe'
})

export class PartTypePipe implements PipeTransform {
    transform(parts: Part[], type: PART_TYPE): Part[] {
        return parts.filter(part => part.type === +type);
    }
}