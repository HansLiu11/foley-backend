import { PatientModel } from "../models";
import Patient from "../interfaces/Patient";

type SetRequest = {
    name: string,
    gender?:string,
    bed?:string,
    case?:string,
    age?:number,
    day?:number,
    foleyStatus?:string,
    state?:string,
    insertedDate?:Date,
  };

type UpdateResponse = {
    message:number,
    data?:Patient
  };
  

export class PatientService{
    private readonly patientModel = new PatientModel();
    
    public async getAll() {
        const patients = await this.patientModel.getPatients();
        return patients;
    };

    public async getPatient(nameBeSearched:string) {
        const patient = await this.patientModel.getPatientByName(nameBeSearched);
        return patient;
    }

    public async getByFoley(foleyStatus:string){
        const patient = await this.patientModel.getPatientsByFoley(foleyStatus);
        return patient;
    }

    /**
   * Add patient
   * @public @async
   * @param p patient data to be added
   * @returns - 0 : success,
   *          - 1 : failed          
   */
    public async addPatient(p:Patient):Promise<number>{
        try{
            const result = await this.patientModel.addPatient(p);
            return 0;
        }catch(e){
            console.log(e);
            return 1;
        }
    }

    /**
     * Set patient data
     * @public @async
     * @param updateData patient data to be updated
     * @returns message - 0 : success,
     *                  - 1 : failed  
     * @returns data - updated patient's data        
     */
    public async setPatient(updateData:SetRequest):Promise<UpdateResponse>{
        try{
            const result = await this.patientModel.updatePatient(updateData.name,updateData);
            return {
                message: 0,
                data: result
            };
        }catch(e){
            console.log(e);
            return {
                message: 1
            };
        }
    };


    /**
     * Set patient data
     * @public @async
     * @param updateData patient data to be updated
     * @returns - 0 : delete success,
     *          - 1 : data not found
     *          - 2 : something wrong  
     */
    public async deletePatient(name:string):Promise<number>{
        try{
            const result = await this.patientModel.deletePatient(name);
            return (result > 0)? 0 : 1 ;

        }catch(e){
            console.log(e);
            return 2
        }
    }
}


export const patientService = new PatientService();
