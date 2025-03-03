/** 
 * @swagger
* /auth:
*   post:
*     summary: Autenticación de usuario
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               correo_electronico:
*                 type: string
*               contraseña:
*                 type: string
*             required:
*               - correo_electronico
*               - contraseña
*     responses:
*       '200':
*         description: Autenticación exitosa
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 token:
*                   type: string
*       '401':
*         description: Credenciales incorrectas
*/
/** 
* @swagger
* /users:
*   get:
*     summary: Obtener todos los usuarios
*     security:
*       - BearerAuth: []
*     responses:
*       '200':
*         description: Lista de usuarios
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Usuario'
*   post:
*     summary: Registrar un nuevo usuario
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Usuario'
*     responses:
*       '201':
*         description: Usuario registrado exitosamente
*/
/** 
* @swagger
* /users/{id}:
*   get:
*     summary: Obtener un usuario por ID
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
*         description: Usuario obtenido exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Usuario'
*   put:
*     summary: Actualizar un usuario
*     security:
*       - BearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Usuario'
*     responses:
*       '200':
*         description: Usuario actualizado exitosamente

*   delete:
*     summary: Eliminar un usuario
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
*         description: Usuario eliminado exitosamente
*/
/** 
* @swagger
* /users/me:
*  get:
*    summary: Obtener la información del usuario autenticado
*    security:
*      - BearerAuth: []
*    responses:
*      '200':
*        description: Información del usuario autenticado obtenida exitosamente
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Usuario'
*      '401':
*        description: No autorizado, token de autenticación inválido o ausente
*/