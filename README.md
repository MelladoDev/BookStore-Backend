
<p align="center">
  <img src="https://imgur.com/ES5T12N.png" alt="Logo" >
</p>

---

# Scripta Backend

Este proyecto implementa el backend para una aplicación de e-commerce. El sistema gestiona usuarios, pedidos,  productos, categorías y productos favoritos, permitiendo el manejo completo de las operaciones típicas de una tienda en línea.

<p align="center">
  <a href="https://bookstore-backend-bw7r.onrender.com">
    <img src="https://img.shields.io/badge/Demo-Live-green?style=for-the-badge" alt="Demo">
  </a>
  <a href="https://github.com/MelladoDev/BookStore">
    <img src="https://img.shields.io/badge/Frontend-Repositorio-blue?style=for-the-badge" alt="Frontend">
  </a>
</p>

## Tecnologías

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![pg](https://img.shields.io/badge/pg-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![NeonDB](https://img.shields.io/badge/NeonDB-bafeb7?style=for-the-badge&logo=neon&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-4A90E2?style=for-the-badge&logo=security&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logo=testinglibrary&logoColor=white)
![CORS](https://img.shields.io/badge/CORS-0072C6?style=for-the-badge&logo=internetexplorer&logoColor=white)
![Morgan](https://img.shields.io/badge/Morgan-1E90FF?style=for-the-badge&logo=logstash&logoColor=white)




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

CREATE TABLE categorias (
  id_categoria BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  descripcion TEXT
);

CREATE TABLE productos (
  id_producto BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  autor VARCHAR(255),
  descripcion TEXT,
  precio INT,
  stock INT,
  imagen VARCHAR(255),
  id_categoria BIGINT REFERENCES categorias(id_categoria),
  fecha_adicion DATE
);

CREATE TABLE pedidos (
  id_pedido BIGSERIAL PRIMARY KEY,
  id_usuario BIGINT REFERENCES usuarios(id_usuario),
  fecha_pedido DATE,
  total BIGINT,
  estado VARCHAR(50)
);

CREATE TABLE detalles_pedido (
  id_detalle BIGSERIAL PRIMARY KEY,
  id_pedido BIGINT REFERENCES pedidos(id_pedido),
  id_producto BIGINT REFERENCES productos(id_producto),
  cantidad INT,
);

CREATE TABLE productos_favoritos (
  id_favorito BIGINT PRIMARY KEY,
  id_usuario BIGINT REFERENCES usuarios(id_usuario),
  id_producto BIGINT REFERENCES productos(id_producto),
  fecha_agregado DATE
);

CREATE TABLE administrador (
  id SERIAL PRIMARY KEY,
  id_usuario BIGINT REFERENCES usuarios(id_usuario),
  usuario VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL
  );
```

## Swagger

- [Documentación de la API con Swagger en local](http://localhost:3000/api-docs)

## Endpoints de la API

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

## Estructura de .env

```js
DATABASE_URL=

PORT=3000

JWT_SECRET = 
```
