import { PART_TYPE } from './part-enum.model';

export class Part {
    constructor(public id: number, public type: PART_TYPE, public brand: string, public model: string, public description: string){}

    static convertStringToEnumType(type:string): number {
        if (type === 'CPU'){
            return PART_TYPE.CPU;
        } else if (type === 'CPUCooler') {
            return PART_TYPE.CPUCooler;
        } else if (type === 'GPU') {
            return PART_TYPE.GPU;
        } else if (type === 'memory') {
            return PART_TYPE.Memory;
        } else if (type === 'harddrive') {
            return PART_TYPE.HardDrive;
        } else if (type === 'motherboard') {
            return PART_TYPE.Motherboard;
        } else if (type === 'case') {
            return PART_TYPE.PCCase;
        } else {
            return PART_TYPE.PowerSupply;
        }
    }

    static convertEnumTypeToString(type : PART_TYPE): string {
        if (type === PART_TYPE.CPU){
            return "CPU";
        } else if (type === PART_TYPE.CPUCooler) {
            return "CPU Cooler";
        } else if (type === PART_TYPE.GPU) {
            return "GPU";
        } else if (type === PART_TYPE.Memory) {
            return "Memory";
        } else if (type === PART_TYPE.HardDrive) {
            return "Hard Drive";
        } else if (type === PART_TYPE.Motherboard) {
            return "Motherboard";
        } else if (type === PART_TYPE.PCCase) {
            return "Case";
        } else {
            return "Power Supply";
        }
    }
}