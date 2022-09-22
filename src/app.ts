/* eslint-disable import-helpers/order-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@errors/AppError";

import createConnection from "./database";

import "@shared/container";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const port = 3333;
createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.get("/home", (request, response) => {
  response.status(200).json({ message: "OK" });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "Error",
      message: `Internal Server Error ${err.message}`,
    });
  }
);

export { app };
