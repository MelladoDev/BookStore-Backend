/**
 * @swagger
 * /favoritos:
 *   get:
 *     summary: Obtener todos los productos favoritos de un usuario
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de productos favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductoFavorito'
 *   post:
 *     summary: Agregar un producto a favoritos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoFavorito'
 *     responses:
 *       '201':
 *         description: Producto agregado a favoritos exitosamente
 */
/**
 * @swagger
 * /favoritos/{id}:
 *   get:
 *     summary: Obtener un producto favorito por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Producto favorito obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductoFavorito'
 *   delete:
 *     summary: Eliminar un producto de favoritos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Producto eliminado de favoritos exitosamente
 */
