import { Schema, Mongoose } from "mongoose";
import Patient from "../interfaces/Patient";

const mongoose = new Mongoose();

const patientSchema = new Schema<Patient>({
    name: {
      type:String, 
      required:true
    },
    gender: {
      type:String,
      required:true
    },
    bed: {
      type:String
    },
    case: {
      type:String
    },
    age: {
      type:Number
    },
    day: {
      type:Number
    },
    foleyStatus: {
      type:String,
      required:true
    },
    state: {
      type:String, 
      default: "1A"
    },
    insertedDate: {
      type:Date
    }
},{ timestamps:true });

// const Model = mongoose.model<Patient>('Patient', patientSchema );

export default mongoose.model<Patient>('patient', patientSchema );