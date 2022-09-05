import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticationUseCase } from "./AuthenticationUseCase";

class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const autenthicationUseCase = container.resolve(AuthenticationUseCase);
    const token = await autenthicationUseCase.execute({
      email,
      password,
    });
    return response.json(token);
  }
}

export { AuthenticationController };
