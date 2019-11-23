export class PC {
    constructor(public id: number, public name: string, public gpuID: number,
        public cpuID: number, public cpuCoolerID: number,
        public motherboardID: number, public memoryID: number,
        public hardDriveID: number, public pcCaseID: number,
        public powersupplyID: number, public description: string) { }


    checkIfPCContainsPartIDNumber(id: number) {
        return this.gpuID === id || this.cpuID === id || this.cpuCoolerID === id || this.motherboardID === id || this.memoryID === id
            || this.hardDriveID === id || this.pcCaseID === id || this.powersupplyID === id;
    }

}