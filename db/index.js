import { Pool } from "pg";
import "dotenv/config.js";

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export const query = (text, params) => {
  return pool.query(text, params);
};
