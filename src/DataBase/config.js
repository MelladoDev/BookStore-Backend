import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("❌ Error al conectar a PostgreSQL:", err.stack);
  }
  console.log("✅ Conexión exitosa a PostgreSQL");
  release();
});

export default pool;
