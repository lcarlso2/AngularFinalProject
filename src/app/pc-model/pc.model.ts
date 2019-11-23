import { Part } from '../part-model/pc-part.model';


export class PC{
    constructor(public id:number, public name:string, public gpu:Part, 
        public cpu:Part, public cpuCooler:Part, 
        public motherboard:Part, public memory:Part, 
        public hardDrive:Part, public pcCase:Part, 
        public powersupply: Part, public description: string){}
        
}