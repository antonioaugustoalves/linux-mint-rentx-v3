import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create a car Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a car rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "f1f2f3f4a1",
      car_id: "11221122",
      expected_date: dayAdd24Hours,
    });
    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not  be able to create a new rental if there is another open for the same user", async () => {
    expect(async () => {
      const rental1 = await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "11221122",
        expected_date: dayAdd24Hours,
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "3433",
        expected_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not  be able to create a new rental if car is unavaliable", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "5433",
        car_id: "testcar",
        expected_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "testcar",
        expected_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a rent with return date less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "test_car12",
        expected_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
