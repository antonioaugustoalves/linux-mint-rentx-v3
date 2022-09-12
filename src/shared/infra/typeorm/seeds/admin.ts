import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../../../../database";

async function create() {
  const connection = await createConnection("localhost");
  const password = await hash("admin1234", 8);
  const id = uuidv4();

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, driver_license, "isAdmin", created_at)
        VALUES('${id}', 'admin', 'antonio.alves81@gmail.com', '${password}', 'B', true, 'now()')`
  );
  await connection.close();
}

create().then(() => {
  console.log("User admin created successfully");
});
