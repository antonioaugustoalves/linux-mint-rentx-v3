/* eslint-disable @typescript-eslint/no-unused-vars */
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Specification | undefined> {
    return this.specifications.find((specification) => specification.id === id);
  }
}

export { SpecificationsRepositoryInMemory };
