import { Router, Request, Response, NextFunction } from "express";
import { patientService } from "../services/patientService";
import model from "../schemas/";
import Patient from "../interfaces/Patient";

const route = Router();
// const mongoClient = new MongoClient(config.databaseURL);

export default (app: Router):void => {
    app.use("/patient", route);

    route.get("/get",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json({message:"get patient"});
        });
    
    route.get("/getall",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const patients = await patientService.getAll();
                const result = await model.find();
                return res.status(200).json({
                    result
                });
                
            } catch (e) {
                return res.status(400).json({
                    message: e.message
                });
            }
        });

    route.post("/add",
        async (req: Request, res: Response) => {
            const { name, gender, bed, cs, age, day, foleyStatus, state, insertedDate } = req.body;
            const patient = new model({
                name:"John",
                gender:"Male",
                bed:"C8763",
                case:"cs",
                age:66,
                day:2,
                foleyStatus:"Inserted",
                state:"1A",
                insertedDate:new Date("2022-02-01")
            });
            
            try{
                const result = await patient.save();
                return res.status(200).json({
                    message: "add patient",
                    data: result
                });
            }catch(error){
                return res.status(400).json({
                    message: error.message
                });
            }
            // const result = await patientService.addPatient({
            //         name:name,
            //         gender:gender,
            //         bed:bed,
            //         case: cs,
            //         age: age,
            //         day: day,
            //         foleyStatus: foleyStatus,
            //         state: state,
            //         insertedDate: new Date(insertedDate),
            //     } as Patient);

            // return res.status(200).json({
            //     message:"add patient",
            //     result: result
            // });
        });

    route.post("/update",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json({message:"update patient"});
        });

    route.post("/delete",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json({message:"delete patient"});
        });

}