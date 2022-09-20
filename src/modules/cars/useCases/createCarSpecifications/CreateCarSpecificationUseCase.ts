/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject("carsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) {
      throw new AppError("Car does not exist");
    }
  }
}

export { CreateCarSpecificationUseCase, IRequest };
