/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const { expected_date, car_id } = request.body;
    const { id } = request.user;
    const rental = await createRentalUseCase.execute({
      car_id,
      expected_date,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
