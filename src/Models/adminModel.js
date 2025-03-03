import pool from "../DataBase/config.js";
import bcrypt from "bcrypt";

class AdminModel {

  static async getAdminByUserId(userId) {
    const query = "SELECT * FROM administrador WHERE id_usuario = $1";
    const result = await pool.query(query, [userId]);
    return result.rows[0]; 
  }
  
  static async createAdmin(userId, usuario, contraseña) {
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const existingAdmin = await this.getAdminByUserId(userId);
    if (existingAdmin) {
      throw new Error("El usuario ya es administrador");
    }

    const query = `
      INSERT INTO administrador (id_usuario, usuario, contraseña)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [userId, usuario, hashedPassword]);
    return result.rows[0];
  }
}

export default AdminModel;