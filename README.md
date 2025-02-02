# API de Registro y Autenticación de Usuarios

Esta es una API de registro y autenticación de usuarios construida con [Hono.js](https://honojs.dev/), utilizando [Zod](https://zod.dev/) para la validación de esquemas, [Turso DB](https://turso.tech/) como base de datos, [Drizzle ORM](https://orm.drizzle.team/) para la gestión de la base de datos, [Bun](https://bun.sh/) para el hashing de contraseñas y [JWT](https://jwt.io/) para la autenticación.

## Características

- **Registro de usuarios**: Los usuarios pueden registrarse proporcionando un nombre, correo electrónico y contraseña.
- **Autenticación de usuarios**: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña para obtener un token JWT.
- **Validación de esquemas**: Se utiliza Zod para validar los datos de entrada.
- **Hashing de contraseñas**: Las contraseñas se hashean utilizando Bun antes de almacenarse en la base de datos.
- **Autenticación JWT**: Se utiliza JWT para manejar la autenticación y proteger rutas.

## Tecnologías Utilizadas

- **[Hono.js](https://honojs.dev/)**: Un framework web rápido y ligero para construir APIs.
- **[Zod](https://zod.dev/)**: Una librería de validación de esquemas TypeScript-first.
- **[Turso DB](https://turso.tech/)**: Una base de datos SQLite distribuida y escalable.
- **[Drizzle ORM](https://orm.drizzle.team/)**: Un ORM TypeScript para bases de datos SQL.
- **[Bun](https://bun.sh/)**: Un runtime de JavaScript que incluye funciones de hashing.
- **[JWT](https://jwt.io/)**: Un estándar para la creación de tokens de autenticación.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Bun](https://bun.sh/) (opcional, pero recomendado para el hashing de contraseñas)
- [Turso DB](https://turso.tech/) (necesitas una cuenta y una base de datos configurada)

## Instalación

1. Clona el repositorio:

```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
```

2. Instala las dependencias:
```bash
   bun install
```

3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:
```bash
    TURSO_CONNECTION_URL=
    TURSO_AUTH_TOKEN=
    JWT_SECRET=
```

4. Ejecuta las migraciones para crear las tablas en la base de datos:
```bash
    bun run migrate
```

5. Inicia el servidor:

```bash
   bun run dev
```

El servidor estará disponible en http://localhost:4000.

# Endpoints

## Registro de Usuario

URL: /api/v1/auth/register

Método: POST

Body:

```bash
   {
    "username": "Nombre del Usuario",
    "email": "usuario@example.com",
    "password": "contraseñaSegura123"
   }
```

## Respuesta Exitosa:
```bash
    {
    "message": "Usuario registrado exitosamente",
    "userId": 1
    }
```

# Inicio de Sesión

URL: /api/v1/auth/login

Método: POST

Body:

```bash
{
  "email": "usuario@example.com",
  "password": "contraseñaSegura123"
}
```

## Respuesta Exitosa:

```bash
{
  "token": "tu_token_jwt"
}
```

# Rutas Protegidas

URL: /api/protected/hello

Método: GET

Headers:

```bash
{
  "Authorization": "Bearer tu_token_jwt"
}
```

## Respuesta Exitosa:
```bash
{
  "message": "Hello World! This is a protected route.",
}
```

URL: /api/protected/profile

Método: GET

Headers:

```bash
{
  "Authorization": "Bearer tu_token_jwt"
}
```

## Respuesta Exitosa:
```bash
{
  "message": "This is your protected profile",
  "user": {
    "id": 1,
    "email": "usuario@example.com"
  }
}
```

# Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.