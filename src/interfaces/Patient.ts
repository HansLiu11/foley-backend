import type { WithId, Document } from 'mongodb'

export default interface Patient extends WithId<Document>{
    id:number,
    name: string,
    gender:string,
    bed:string,
    case:string,
    age:number,
    day:number,
    foleyStatus:string,
    state:string,
    insertedDate?:Date,
    createdAt:Date,
    updatedAt:Date
}