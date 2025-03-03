import pool from "../DataBase/config.js";
import bcrypt from "bcrypt";

export const verifyAdmin = async (req, res, next) => {
  const { usuario, contraseña } = req.headers;

  if (!usuario || !contraseña) {
    return res.status(401).json({ error: "Credenciales requeridas" });
  }

  try {
   
    const query = "SELECT * FROM administrador WHERE usuario = $1";
    const result = await pool.query(query, [usuario]);

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    const adminRecord = result.rows[0];
    
    
    const isPasswordValid = await bcrypt.compare(contraseña, adminRecord.contraseña);
    if (!isPasswordValid) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }


    req.admin = adminRecord;
    next();
  } catch (error) {
    console.error("Error al verificar el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
