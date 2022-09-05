/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

import { AuthenticationUseCase } from "./AuthenticationUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticationUseCase: AuthenticationUseCase;
let createUsersUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticationUseCase = new AuthenticationUseCase(usersRepositoryInMemory);
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000122",
      name: "John Doe",
      email: "teste@rentx.com.br",
      password: "123456",
    };
    await createUsersUseCase.execute(user);
    const result = await authenticationUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticationUseCase.execute({
        email: "fake@google.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with an incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9898989",
        email: "test.driver@gmail.com",
        password: "1234",
        name: "Jhonny BeGoogd",
      };
      await createUsersUseCase.execute(user);
      await authenticationUseCase.execute({
        email: user.email,
        password: "This_is_the_wrong_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
