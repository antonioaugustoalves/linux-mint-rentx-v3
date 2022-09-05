/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable, inject } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }
    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
