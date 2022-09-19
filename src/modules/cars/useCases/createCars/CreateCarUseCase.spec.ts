/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create a car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "Uno Mille",
      description: "Uno Mille ano 94 com escada",
      daily_rate: 100,
      license_plate: "ABC5-D44",
      fine_amount: 50,
      brand: "FIAT",
      category_id: "Category",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with an existent license plate", async () => {
    expect(async () => {
      const car1 = await createCarUseCase.execute({
        name: "Uno Mille",
        description: "Uno Mille ano 94 com escada",
        daily_rate: 100,
        license_plate: "ABC5-D44",
        fine_amount: 50,
        brand: "FIAT",
        category_id: "Category",
      });

      const car2 = await createCarUseCase.execute({
        name: "Palio EX",
        description: "Fiat Palio 1999",
        daily_rate: 100,
        license_plate: "ABC5-D44",
        fine_amount: 50,
        brand: "FIAT",
        category_id: "Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with avaliable option with value true by default", async () => {
    const car3 = await createCarUseCase.execute({
      name: "Uno Mille",
      description: "Uno Mille ano 94 com escada",
      daily_rate: 100,
      license_plate: "ABC5-D44",
      fine_amount: 50,
      brand: "FIAT",
      category_id: "Category",
    });
    expect(car3.avaliable).toBe(true);
  });
});
