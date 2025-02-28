import express from "express";
import cors from "cors";
import { config } from "dotenv";

import authRoutes from "./src/Routes/authRoutes.js";
import categoryRoutes from "./src/Routes/categoryRoutes.js"; 
import handleLog from "./src/Middlewares/handleLog.js";
import productRoutes from "./src/Routes/productRoutes.js";
import userRoutes from "./src/Routes/userRoutes.js";
import favoritosRoutes from "./src/Routes/favoritosRoutes.js";
import purchaseHistoryRoutes from "./src/Routes/purchaseHistoryRoutes.js";
import adminRoutes from "./src/Routes/adminRoutes.js";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(handleLog);

app.use("/scripta-backend/v1/auth", authRoutes);
app.use("/scripta-backend/v1/categories", categoryRoutes);
app.use("/scripta-backend/v1/products", productRoutes);
app.use("/scripta-backend/v1/users", userRoutes);
app.use("/scripta-backend/v1/favoritos", favoritosRoutes);
app.use("/scripta-backend/v1/purchase-history", purchaseHistoryRoutes);
app.use("/scripta-backend/v1/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

// Solo iniciar el servidor si NO estamos en ambiente de test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

export default app;
