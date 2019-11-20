import { PART_TYPE } from './part-enum.model';

export class Part {
    constructor(public id: number, public type: PART_TYPE, public brand: string, public model: string, public description: string){}
}