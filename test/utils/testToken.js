import jwt from "jsonwebtoken";
import { config } from "dotenv";

// Asegúrate de cargar las variables de entorno
config();

// Genera un token de prueba usando JWT_SECRET de tu .env
const testToken = jwt.sign(
  { id_usuario: 1, correo_electronico: "test@example.com" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

export default testToken;
