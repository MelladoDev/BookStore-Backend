import { Pool } from 'pg';
import { config } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
config();

const testPool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Usamos directamente DATABASE_URL
});

export default testPool;
