import pool from "../DataBase/config.js";
import bcrypt from "bcrypt";

class AdminModel {

  static async getAdminByUserId(userId) {
    const query = "SELECT * FROM administrador WHERE id_usuario = $1";
    const result = await pool.query(query, [userId]);
    return result.rows[0]; 
  }
  
  static async createAdmin(userId, usuario, contraseña) {
    if (!contraseña) {
        throw new Error("La contraseña no puede estar vacía");
    }

    const saltRounds = 10;
    console.log("Contraseña recibida:", contraseña); // Verificar que no sea undefined
    
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
    console.log("Contraseña hasheada:", hashedPassword); // Verificar que se genera el hash correctamente

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