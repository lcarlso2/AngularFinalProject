import { Part } from '../parts/pc-part.model';


export class PC{
    constructor(public id:number, public name:string, public gpu:Part, 
        public cpu:Part, public cpuCooler:Part, 
        public mobo:Part, public memory:Part, 
        public hardDrive:Part, public pcCase:Part, 
        public psu: Part, public description: string){}
        
}