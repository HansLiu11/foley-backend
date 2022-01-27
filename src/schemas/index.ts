import { Mongoose } from "mongoose";

const mongoose = new Mongoose();
const Schema = mongoose.Schema;

export const patientModelSchema = new Schema({
    name: String,
    gender:String,
    bed:String,
    case:String,
    age:Number,
    day:Number,
    foleyStatus:String,
    state:{type:String, default: "1A"},
    insertedDate:String,
    updatedDate: { type: Date, default: Date.now },
})