import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ car_id, expected_date, user_id }: IRequest): Promise<Rental> {
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

    const today = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(today, expected_date);

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
