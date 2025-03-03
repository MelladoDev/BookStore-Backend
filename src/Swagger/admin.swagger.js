/**
* @swagger
* /admin/me:
*   get:
*     summary: Obtener información del administrador autenticado
*     description: Retorna la información del administrador autenticado. Se requiere un token JWT válido en el header 'Authorization'.
*     security:
*       - BearerAuth: []
*     responses:
*       '200':
*         description: Administrador autenticado obtenido exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Admin'
*       '401':
*         description: No autorizado, token ausente o inválido
*       '403':
*         description: Acceso no autorizado
* /admin/create:
*   post:
*     summary: Crear un nuevo administrador
*     description: Convierte un usuario existente en administrador. Se requiere autenticación mediante token JWT en el header 'Authorization'.
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/AdminInput'
*     responses:
*       '201':
*         description: Administrador creado exitosamente
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Admin'
*       '400':
*         description: Solicitud inválida, datos incompletos o erróneos
*       '403':
*         description: Acceso no autorizado
*       '500':
*         description: Error interno del servidor
*/

