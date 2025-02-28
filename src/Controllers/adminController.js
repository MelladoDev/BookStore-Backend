import { getAdminInfo } from "../Models/admin.js";

export const getAdminData = async (req, res) => {
  try {
    const admin = await getAdminInfo();
    if (!admin) {
      return res.status(404).json({ error: "No se encontró información del admin" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error al obtener los datos del admin:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
