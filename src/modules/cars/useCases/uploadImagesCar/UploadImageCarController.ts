import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadIamgeCarUseCase } from "./UploadIamgeCarUseCase";

interface IFiles {
  filename: string;
}
class UploadImageCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadImageCarUseCase = container.resolve(UploadIamgeCarUseCase);
    const images_names = images.map((file) => file.filename);
    uploadImageCarUseCase.execute({ car_id: id, images_names });

    return response.status(201).send();
  }
}

export { UploadImageCarController };
