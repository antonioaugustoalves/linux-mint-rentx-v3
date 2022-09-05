/* eslint-disable @typescript-eslint/no-unused-vars */
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticationUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificar se o usuario existe:
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail or password incorrect.", 401);
    }

    // Verificar se a senha do usuario está correta:
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("E-mail or password incorrect.");
    }

    // Gerar o Token de acesso
    const token = sign({}, "92a64c7a3fe0196ad1a5760524edc29e", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticationUseCase };
