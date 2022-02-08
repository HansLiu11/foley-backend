import model from "../schemas/";
import Logger from "../logger"
import Patient from "../interfaces/Patient";
import { MongoClient,  WithId, Document } from "mongodb";
import config from "../config";

const client = new MongoClient(config.databaseURL);
client.connect();

export class PatientModel{
    private NAMESPACE = "PatientModel";

    /**
     * Get patient by patient's name
     * @param patientName the patient's name
     * @returns the patient to be found
     */
    getPatientByName = async (patientName :String):Promise<Patient | null>=> {
        const patient = await client.db("patientDB").collection("patient").findOne({ name:patientName });
        if (!patient) {
            Logger.info("Patient not found");
            return null;
        }
        return patient as Patient;
    };

    /**
     * Get all patients
     * @returns all patients
     */
    getPatients = async():Promise<Patient[]> => {
        const patients = await client.db("patientDB").collection("patient").find().toArray() as Patient[]
        return patients;
    };

    /**
     * Get patients by foley status
     * @param foleyStatus the foley status want to search
     * @returns patients with the foley status
     */
    getPatientsByFoley = async (foleyStatus:string) => {
        const patients = await client.db("patientDB").collection("patient")
                                                .find({ foleyStatus }).toArray() as Patient[];
        return patients;
    }

    
    /**
     * Add patient into Database
     * @param p patient's data to be add 
     * @returns the add result
     */

    addPatient = async (p:Patient) => {
        const patient = new model({
            name: p.name,
            gender: p.gender,
            bed: p.bed,
            case: p.case,
            age: p.age,
            day: p.day,
            foleyStatus: p.foleyStatus,
            state: "1A",
            insertedDate: p.insertedDate,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const result = await client.db("patientDB").collection("patient").insertOne(patient);
        return result;
    };

    /**
     * Update patient
     * @param patientName patient's name to be updated
     * @param newPatientData new patient's data
     * @returns the updated patient's data
     */
    updatePatient = async (patientName:string, newPatientData: Object):Promise<Patient> => {
        try {
            const result = await client.db("patientDB").collection("patient")
                        .updateOne({ name:patientName }, 
                            {$currentDate: {
                                updatedAt: true,
                             },
                             $set: newPatientData 
                            },{ upsert: true });
        
            Logger.info(`${result.modifiedCount} document(s) was/were updated.`);
            const patient = await client.db("patientDB").collection("patient").findOne({ name:patientName }) as Patient;
            return patient;
          } catch (error) {
            Logger.info("updateFriend fail");
            throw error;
          }      
        
    };

    /**
     * Remove patient from database
     * @param nameBeDeleted patient's name want to remove
     * @returns number of documents be deleted
     */
    deletePatient =async (nameBeDeleted:string) => {
        const result = await client.db("patientDB").collection("patient").deleteOne({ name:nameBeDeleted });
        return result.deletedCount;
    }
    

}