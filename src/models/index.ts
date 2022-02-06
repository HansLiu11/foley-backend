import model from "../schemas/";
import moogoose from "mongoose";
import Patient from "../interfaces/Patient";

export class PatientModel{
    private NAMESPACE = "PatientModel";

    getPatientByName = async (name :string) => {
        const patient = await model.findOne({ name }, (err:Error, patientObj:any)=>{
            console.log(patientObj);
        });
        return patient;
    };

    getPatients = () => {
        model.find()
                .exec()
                .then(patients => {
                    return patients;
                });
    };

    addPatient = async (p:Patient) => {
        const patient = new model({
            _id: new moogoose.Types.ObjectId(),
            name: p.name,
            gender: p.gender,
            bed: p.bed,
            case: p.case,
            age: p.age,
            day: p.day,
            foleyStatus: p.foleyStatus,
            state: "1A",
            insertedDate: p.insertedDate
        });

        patient.save()
            .then(result => { 
                console.log(result); 
            });
    }
    

}