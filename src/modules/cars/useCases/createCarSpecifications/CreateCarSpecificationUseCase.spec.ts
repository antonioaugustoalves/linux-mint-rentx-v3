import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create a car specifications list", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository
    );
  });

  it("Should be able to add  specifications  to the car", async () => {
    const car = await carsRepository.create({
      name: "Uno Mille",
      description: "Uno Mille ano 94 com escada",
      daily_rate: 100,
      license_plate: "ABC5-D44",
      fine_amount: 50,
      brand: "FIAT",
      category_id: "Category",
    });
    const specifications_id = ["12345", "54321"];
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it("Should not  be able to add  specifications if the car does not exist", async () => {
    expect(async () => {
      const car_id = "1234567";
      const specifications_id = ["12345", "54321"];
      createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
