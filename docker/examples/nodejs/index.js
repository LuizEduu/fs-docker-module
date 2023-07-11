import http from "node:http";

import mysql from "mysql2/promise";

const server = http.createServer(async (req, res) => {
  const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
  };

  const connection = await mysql.createConnection(config);

  const sql = `INSERT INTO users(name) VALUES('John Doe')`;
  connection.query(sql);

  const [rows, _] = await connection.execute("SELECT * FROM users");

  connection.end();

  const users = rows.map(user => `${user.name}`).join(",")

  res.end(users);
});

server.listen(3000, () => console.log("Server running on port 3000"));
