import { Router, Request, Response, NextFunction } from "express";
import { patientService } from "../services/patientService";
import Patient from "../interfaces/Patient";

const route = Router();
// const mongoClient = new MongoClient(config.databaseURL);

export default (app: Router):void => {
    app.use("/patient", route);

    route.get("/get",
        async (req: Request, res: Response, next: NextFunction) => {
            const name = String(req.query.name);
            const result = await patientService.getPatient(name);
            return res.status(200).json({
                data: result
            });
        });
    
    route.get("/getall",
        async (req: Request, res: Response, next: NextFunction) => {
            const result = await patientService.getAll();
            return res.status(200).json({
                data: result
            });
        });

    route.get("/get-foley",
        async (req: Request, res: Response, next: NextFunction) => {
            const foleyStatus = String(req.query.foleyStatus);
            const result = await patientService.getByFoley(foleyStatus);
            return res.status(200).json({
                data: result
            });
        });

    route.post("/add",
        async (req: Request, res: Response) => {
            const { name, gender, bed, cs, age, day, foleyStatus, state, insertedDate } = req.body;

            const result = await patientService.addPatient({
                    name:name,
                    gender:gender,
                    bed:bed,
                    case: cs,
                    age: age,
                    day: day,
                    foleyStatus: foleyStatus,
                    state: state,
                    insertedDate: new Date(insertedDate),
                } as Patient);

            return res.status(200).json({
                message:"add patient",
                result: result
            });
        });

    route.post("/update",
        async (req: Request, res: Response, next: NextFunction) => {
            const result = await patientService.setPatient(req.body);
            return res.status(200).json(result);
        });

    route.post("/delete",
        async (req: Request, res: Response, next: NextFunction) => {
            const name = String(req.body.name);
            const msg = await patientService.deletePatient(name);
            return res.status(200).json({message:msg});
        });

}