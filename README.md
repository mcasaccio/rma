# Rma Service
![img](https://i.imgur.com/seGeLxu.png)

RMA Service es un proyecto realizado en Angular con un servidor API Rest montado en Node JS.

> El sitio tomara 30 segundos para lanzar un nuevo deploy al abrir el link (Heroku)

Demo online: https://rma-service.herokuapp.com

Usuario administrador:
> Email: admin@linkedin.com
Password: admin

## Descripción:
El sistema es una aplicación web que dispone de funcionalidades como:
- Registro de usuarios
- Inicio de sesión
- Dashboard (muestra las últimas 10 ordenes)
- Crear ordenes (estados pendientes o completados)
- Buscar ordenes
- Buscar clientes
- Editar clientes
- Datos de perfil
- Visualización de estados (cargando)

Información de implementación en Angular:
- Modularización de módulos
- Lazy Load de rutas
- Rutas protegidas
- Formularios reactivos con sus respectivas validaciones
- Consumo de API Rest
- Autenticación por Token
- Menú activo según ruta (menú seleccionado al recargar sitio y expandirlo)

Información de implementación en NodeJS:
- Autenticación por Token (JWT)
- Base de datos no relacional MongoDB con ORM Mongoose
- Encriptación por Hash de contraseñas en la base de datos
- Middlewares de validación token válido y validación de campos
- Menu sidebar enviado del backend al frontend (menú creado en un objeto y recorrido desde el frontend)
