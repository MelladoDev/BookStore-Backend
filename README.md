# Backend para Aplicación de E-commerce

Este proyecto implementa el backend para una aplicación de e-commerce. El sistema gestiona usuarios, pedidos,  productos, categorías y productos favoritos, permitiendo el manejo completo de las operaciones típicas de una tienda en línea.

## Descripción del Proyecto

El backend está diseñado para:
- Administrar la información de los usuarios y sus registros.
- Procesar pedidos y detallar productos solicitados .
- Manejar favoritos de los usuarios.
- Organizar los productos en categorías para facilitar la navegación y búsqueda.

La aplicación se conecta a una base de datos relacional que almacena toda la información relevante, siguiendo un modelo de datos normalizado para asegurar la integridad y escalabilidad del sistema.

## Esquema de la Base de Datos

A continuación se muestra el script SQL que crea las tablas utilizadas en el proyecto:

```sql
CREATE TABLE usuarios (
  id_usuario BIGINT PRIMARY KEY,
  nombre VARCHAR(255),
  correo_electronico VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(20),
  contraseña VARCHAR(255),
  fecha_registro DATE
);

CREATE TABLE pedidos (
  id_pedido BIGINT PRIMARY KEY,
  id_usuario BIGINT REFERENCES usuarios(id_usuario),
  fecha_pedido DATE,
  total BIGINT,
  estado VARCHAR(50)
);

CREATE TABLE categorias (
  id_categoria BIGINT PRIMARY KEY,
  nombre VARCHAR(255),
  descripcion TEXT
);

CREATE TABLE productos (
  id_producto BIGINT PRIMARY KEY,
  nombre VARCHAR(255),
  descripcion TEXT,
  precio INT,
  stock INT,
  imagen VARCHAR(255),
  id_categoria BIGINT REFERENCES categorias(id_categoria),
  fecha_adicion DATE
);

CREATE TABLE detalles_pedido (
  id_detalle INT PRIMARY KEY,
  id_pedido BIGINT REFERENCES pedidos(id_pedido),
  id_producto BIGINT REFERENCES productos(id_producto),
  cantidad INT,
  precio_unitario INT
);



CREATE TABLE productos_favoritos (
  id_favorito BIGINT PRIMARY KEY,
  id_usuario BIGINT REFERENCES usuarios(id_usuario),
  id_producto BIGINT REFERENCES productos(id_producto),
  fecha_agregado DATE
);
```

# Endpoints de la API

- **Autenticación**  
  - Base: `/scripta-backend/v1/auth`

- **Categorías**  
  - Base: `/scripta-backend/v1/categories`

- **Productos**  
  - Base: `/scripta-backend/v1/products`

- **Usuarios**  
  - Base: `/scripta-backend/v1/users`

- **Favoritos**  
  - Base: `/scripta-backend/v1/favoritos`

# Estructura de .env

```
DATABASE_URL=

PORT=3000

JWT_SECRET = 
```

