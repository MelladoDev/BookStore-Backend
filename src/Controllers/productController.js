import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await getProductById(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const { nombre, autor, descripcion, precio, stock, imagen, id_categoria } =
      req.body;
    const newProduct = await createProduct(
      nombre,
      autor,
      descripcion,
      precio,
      stock,
      imagen,
      id_categoria
    );
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, autor, descripcion, precio, stock, imagen, id_categoria } =
      req.body;
    const updatedProduct = await updateProduct(
      id,
      nombre,
      autor,
      descripcion,
      precio,
      stock,
      imagen,
      id_categoria
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);
    res.json(deletedProduct);
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
