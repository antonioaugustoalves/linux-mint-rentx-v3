import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_date: Date;
}

class CreateRentalUseCase {
  constructor(
    // @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute({ user_id, car_id, expected_date }: IRequest): Promise<Rental> {
    const carUnavaliable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    const minimun_daily = 24;

    if (carUnavaliable) {
      throw new AppError("Car is unavaliable");
    }

    const rentalOpenUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenUser) {
      throw new AppError("There is a rental in progress for this user");
    }

    const expectedDateFormat = dayjs(expected_date).utc().local().format();
    const today = dayjs().utc().local().format();
    const compare = dayjs(expectedDateFormat).diff(today, "hours");
    console.log(`Compare Date: ${compare}`);

    if (compare < minimun_daily) {
      throw new AppError("The minimum daily is 24 hours");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
