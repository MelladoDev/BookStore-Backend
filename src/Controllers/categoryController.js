import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../Models/categoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(category);
  } catch (error) {
    console.error("❌ Error al obtener categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

export const createNewCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newCategory = await createCategory(nombre, descripcion);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const updatedCategory = await updateCategory(
      req.params.id,
      nombre,
      descripcion
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error("❌ Error al actualizar categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};
