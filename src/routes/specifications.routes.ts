import { Router } from "express";

import { ensureAuthetication } from "../middlewares/ensureAuthentication";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecification/ListSpecifiationsController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthetication);
specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
