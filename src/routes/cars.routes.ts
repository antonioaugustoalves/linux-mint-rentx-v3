import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthetication } from "middlewares/ensureAuthentication";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCars/CreateCarController";
import { CreateCarsSpecificationsController } from "@modules/cars/useCases/createCarSpecifications/CreateCarsSpecificationsController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadImageCarController } from "@modules/cars/useCases/uploadImagesCar/UploadImageCarController";

import uploadConfig from "../config/upload";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarsSpecificationsController =
  new CreateCarsSpecificationsController();
const uploadImageCarController = new UploadImageCarController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

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

carsRoutes.post(
  "/images/:id",
  ensureAuthetication,
  ensureAdmin,
  upload.array("images"),
  uploadImageCarController.handle
);

export { carsRoutes };
