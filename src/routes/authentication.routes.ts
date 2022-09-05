import { Router } from "express";

import { AuthenticationController } from "../modules/accounts/useCases/authenticaUser/AuthenticationController";

const autenthicationRoutes = Router();

const authenticationController = new AuthenticationController();

autenthicationRoutes.post("/sessions", authenticationController.handle);

export { autenthicationRoutes };
