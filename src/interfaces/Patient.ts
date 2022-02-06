import { Document } from "mongoose";

export default interface Patient extends Document{
    name: String,
    gender:String,
    bed:String,
    case:String,
    age:Number,
    day:Number,
    foleyStatus:String,
    state:String,
    insertedDate?:Date
}