import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";

import { ensureAuthetication } from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthetication, createRentalController.handle);

export { rentalRoutes };
