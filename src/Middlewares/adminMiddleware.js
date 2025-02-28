import pool from "../DataBase/config.js";

export const verifyAdmin = async (req, res, next) => {
  const { usuario, contraseña } = req.headers; // Se espera que el admin envíe su usuario y contraseña en los headers

  if (!usuario || !contraseña) {
    return res.status(401).json({ error: "Credenciales requeridas" });
  }

  try {
    const query = `SELECT * FROM administrador WHERE usuario = $1 AND contraseña = $2`;
    const result = await pool.query(query, [usuario, contraseña]);

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    next(); // Si la autenticación es correcta, permite el acceso a la ruta protegida
  } catch (error) {
    console.error("Error al verificar el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
