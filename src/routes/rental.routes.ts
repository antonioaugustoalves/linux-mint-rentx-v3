import { Router } from "express";
import { ensureAuthetication } from "middlewares/ensureAuthentication";

import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthetication, createRentalController.handle);

export { rentalRoutes };
