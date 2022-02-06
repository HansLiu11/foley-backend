import { PatientModel } from "../models";
import Patient from "../interfaces/Patient";

export class PatientService{
    private readonly patientModel = new PatientModel();
    
    public async getAll() {
        const patients = this.patientModel.getPatients();
        return patients;
    };

    public async addPatient(p:Patient):Promise<number>{
        try{
            await this.patientModel.addPatient(p);
            return 0;
        }catch(e){
            console.log(e);
            return 1;
        }
        
    }
}


export const patientService = new PatientService();
