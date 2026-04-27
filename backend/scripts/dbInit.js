import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const initDB = async () => {
  console.log("DB ENV:", {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
});
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query("CREATE DATABASE IF NOT EXISTS cardioguard");
  console.log("✅ Database initialized");

  await connection.end();
};