import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthetication } from "../middlewares/ensureAuthentication";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecification/ListSpecifiationsController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthetication,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
