import pool from "../DataBase/config.js";
import bcrypt from "bcrypt";

class AuthController {
  static async login(req, res) {
    const { correo_electronico, contraseña } = req.body;

    try {
      // Buscar el usuario en la base de datos
      const result = await pool.query(
        "SELECT * FROM usuarios WHERE correo_electronico = $1",
        [correo_electronico]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const usuario = result.rows[0];

      // Comparar la contraseña ingresada con la almacenada en la base de datos
      const match = await bcrypt.compare(contraseña, usuario.contraseña);

      if (!match) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Generar un token JWT para autenticar el usuario
      const token = await jwt.sign(
        { id_usuario: usuario.id_usuario, correo_electronico: usuario.correo_electronico },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
}

export default AuthController;
