/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create the specifications of an existent car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory(); //
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be able to add a specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno Mille",
      description: "Uno Mille ano 94 com escada",
      daily_rate: 100,
      license_plate: "ABC5-D44",
      fine_amount: 50,
      brand: "FIAT",
      category_id: "Category",
    });

    const specifications_id = ["5432"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id!, // car.id nunca é nulo!
      specifications_id,
    });
  });

  it("Should not be able to add a specification to an inexistent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["5432"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
