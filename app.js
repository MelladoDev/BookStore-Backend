import express from "express";
import cors from "cors";
import { config } from "dotenv";

import categoryRoutes from "./src/Routes/categoryRoutes.js"; // Importar rutas de categorías

import handleLog from "./src/Middlewares/handleLog.js";

import productRoutes from "./src/Routes/productRoutes.js";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(handleLog);

app.use("/categories", categoryRoutes);

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
