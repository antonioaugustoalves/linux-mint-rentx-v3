import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../app";
import createConnection from "../../../../database/index";

describe("Testing ListCategoryController", () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const password = await hash("2312", 8);
    const id = uuidv4();

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, driver_license, "isAdmin", created_at)
        VALUES('${id}', 'admin', 'antonio@rentx.com', '${password}', 'B', true, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category ", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "antonio@rentx.com",
      password: "2312",
    });
    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .send({
        name: " Category name test",
        description: "Test description",
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });
});
