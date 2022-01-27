import { Router, urlencoded } from "express";
import patient from "./route"

export default (): Router => {
    const app = Router();
    app.use(urlencoded({ extended: true }));
    patient(app);
  
    return app
};
  