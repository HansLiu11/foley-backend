import { Router, Request, Response, NextFunction } from "express";

const route = Router()

export default (app: Router):void => {
    app.use("/patient", route);

    route.get("/get",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json("get patient");
        });

    route.post("/add",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json("add patient");
        });

    route.post("/update",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json("update patient");
        });

    route.post("/delete",
        async (req: Request, res: Response, next: NextFunction) => {
            return res.status(200).json("delete patient");
        });

}