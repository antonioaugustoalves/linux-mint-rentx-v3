import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthetication } from "middlewares/ensureAuthentication";

import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController";
import { CreateCarsSpecificationsController } from "@modules/cars/useCases/createCarSpecifications/CreateCarsSpecificationsController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarsSpecificationsController =
  new CreateCarsSpecificationsController();

carsRoutes.post(
  "/",
  ensureAuthetication,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/avaliable", listCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthetication,
  ensureAdmin,
  createCarsSpecificationsController.handle
);

export { carsRoutes };
