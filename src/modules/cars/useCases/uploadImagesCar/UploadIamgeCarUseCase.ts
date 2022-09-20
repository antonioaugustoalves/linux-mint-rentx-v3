import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}
@injectable()
class UploadIamgeCarUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}
  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.map(async (image) => {
      this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadIamgeCarUseCase };
