import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

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

    if (carUnavaliable) {
      throw new AppError("Car is unavaliable");
    }

    const rentalOpenUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenUser) {
      throw new AppError("There is a rental in progress for this user");
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
