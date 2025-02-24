import UsuarioModel from "../Models/userModel.js";

class UsuarioController {
  static async getAll(req, res) {
    try {
      const usuarios = await UsuarioModel.getAll();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }

  static async getById(req, res) {
    try {
      const usuario = await UsuarioModel.getById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }

  static async create(req, res) {
    try {
      const nuevoUsuario = await UsuarioModel.create(req.body);
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      console.error("Error al crear usuario:", err);
    console.error(err.stack);
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  }

  static async update(req, res) {
    try {
      const usuarioActualizado = await UsuarioModel.update(
        req.params.id,
        req.body
      );
      if (!usuarioActualizado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(usuarioActualizado);
    } catch (err) {
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  static async delete(req, res) {
    try {
      const usuarioEliminado = await UsuarioModel.delete(req.params.id);
      if (!usuarioEliminado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  }
}

export default UsuarioController;
