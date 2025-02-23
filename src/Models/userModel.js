import pool from "../DataBase/config.js";

class UsuarioModel {
  static async getAll() {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id]
    );
    return result.rows[0];
  }

  static async create({
    nombre,
    correo_electronico,
    direccion,
    telefono,
    contraseña,
  }) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, correo_electronico, direccion, telefono, contraseña, fecha_registro) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) RETURNING *`,
      [nombre, correo_electronico, direccion, telefono, hashedPassword]
    );
    return result.rows[0];
  }

  static async update(
    id,
    { nombre, correo_electronico, direccion, telefono, contraseña }
  ) {
    let hashedPassword = contraseña;

    if (contraseña) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    }

    const result = await pool.query(
      `UPDATE usuarios 
       SET nombre = $1, correo_electronico = $2, direccion = $3, telefono = $4, contraseña = $5 
       WHERE id_usuario = $6 RETURNING *`,
      [nombre, correo_electronico, direccion, telefono, hashedPassword, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

export default UsuarioModel;
