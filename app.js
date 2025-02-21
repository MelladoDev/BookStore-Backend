import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import handleLog from './src/Middlewares/handleLog.js';


config();
const app = express();
app.use(cors());
app.use(json());
app.use(handleLog);


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
}); 