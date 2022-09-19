import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List All cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all avaliable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro de Teste ",
      description: "Carro de teste ",
      daily_rate: 600.0,
      license_plate: "IHX5-G99",
      fine_amount: 200.0,
      brand: "Pegeout",
      category_id: "cat_id",
    });
    const cars = await listCarsUseCase.execute();
    expect(cars).toEqual([car]);
  });

  it("Should be able to");
});
