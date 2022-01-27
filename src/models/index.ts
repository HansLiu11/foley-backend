import { patientModelSchema } from "../schemas";
import { Mongoose } from "mongoose";

const mongoose = new Mongoose();
const model = mongoose.model('patirentModel', patientModelSchema );

const instance = new model();
instance.save(function (err: Error) {});

export class PatientModel{
    private NAMESPACE = "PatientModel";


}