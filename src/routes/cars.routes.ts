import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthetication } from "middlewares/ensureAuthentication";

import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  ensureAuthetication,
  ensureAdmin,
  createCarController.handle
);

export { carsRoutes };
