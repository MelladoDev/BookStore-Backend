import AdminModel from "../Models/adminModel.js";

class AdminController {  
  
  static async getAdmin(req, res) {
    try {
      // Se espera que el middleware verifyAdmin ya validara las credenciales
      // y que en los headers se envíe el nombre de usuario.
      const { usuario } = req.headers;
      if (!usuario) {
        return res.status(400).json({ error: "El nombre de usuario es requerido en los headers" });
      }
      const adminData = await AdminModel.getAdminByUsuario(usuario);
      if (!adminData) {
        return res.status(404).json({ error: "Administrador no encontrado" });
      }
      res.json({ message: "Administrador encontrado", admin: adminData });
    } catch (error) {
      console.error("Error al obtener el administrador:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  static async createAdmin(req, res) {
    try {
      const nuevoAdmin = await AdminModel.createAdmin(req.body);
      res.status(201).json({ message: "Administrador creado exitosamente", admin: nuevoAdmin });  
      
    } catch (error) {
      console.error("Error al crear administrador:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default AdminController;
