import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findBylicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvaliable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
