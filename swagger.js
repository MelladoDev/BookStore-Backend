import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scripta API',
      version: '1.0.0',
      description: 'API para la gestión de usuarios, productos, pedidos y favoritos.',
    },
    servers: [
        {
          url: '/scripta-backend/v1',
        },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            
            nombre: { type: 'string' },
            correo_electronico: { type: 'string' },
            contraseña: { type: 'string' },
            direccion: { type: 'string' },
            telefono: { type: 'string' },
            fecha_registro: { type: 'string', format: 'date' },
          },
        },
        Categoria: {
          type: 'object',
          properties: {
            id_categoria: { type: 'integer' },
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
          },
        },
        Producto: {
          type: 'object',
          properties: {
            id_producto: { type: 'integer' },
            nombre: { type: 'string' },
            descripcion: { type: 'string' },
            precio: { type: 'integer' },
            stock: { type: 'integer' },
            imagen: { type: 'string' },
            id_categoria: { type: 'integer' },
            fecha_adicion: { type: 'string', format: 'date' },
          },
        },
        ProductoFavorito: {
          type: 'object',
          properties: {
            id_favorito: { type: 'integer' },
            id_usuario: { type: 'integer' },
            id_producto: { type: 'integer' },
            fecha_agregado: { type: 'string', format: 'date' },
          },
        },
      },
    },
  },
  apis: ['./src/swagger/*.swagger.js'], // Ruta correcta a los archivos de anotaciones
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi }
