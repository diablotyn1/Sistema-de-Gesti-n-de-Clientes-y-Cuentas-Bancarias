# Sistema de Gestión de Clientes y Cuentas Bancarias

Aplicación Full Stack para la gestión de clientes y cuentas bancarias, desarrollada con NestJS, React, TypeScript y PostgreSQL.

## 📋 Información de Entrega

**Repositorio:** [URL del repositorio en GitHub]

---

## 🚀 Tecnologías Utilizadas

### Backend
- **NestJS** 10.x - Framework de Node.js
- **TypeScript** 5.x - Lenguaje de programación
- **PostgreSQL** - Base de datos relacional
- **TypeORM** - ORM para TypeScript
- **Swagger** - Documentación automática de API
- **Class Validator** - Validación de datos

### Frontend
- **React** 18.x - Librería de UI
- **TypeScript** 5.x - Lenguaje de programación
- **Vite** - Build tool
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP
- **React Router DOM** - Enrutamiento
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos

---

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/                 # API REST con NestJS
│   ├── src/
│   │   ├── clientes/       # Módulo de clientes
│   │   ├── cuentas/        # Módulo de cuentas
│   │   ├── app.module.ts   # Módulo principal
│   │   └── main.ts         # Punto de entrada
│   ├── .env                # Variables de entorno
│   ├── package.json
│   └── README.md
│
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Servicios API
│   │   ├── types/         # Tipos TypeScript
│   │   ├── pages/         # Páginas
│   │   └── App.tsx        # Componente principal
│   ├── package.json
│   └── README.md
│
├── base de datos
│   ├── banco_db.sql       # Script de base de datos
├── .gitignore
└── README.md              # Este archivo
```

---

## 🔧 Requisitos Previos

- **Node.js** v22.20.0 o superior
- **PostgreSQL** 12 o superior
- **npm**
- **Git**

---

## 📦 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd proyecto
```

### 2. Configurar la Base de Datos

**Crear la base de datos en PostgreSQL:**

```sql
CREATE DATABASE banco_db;
```

**Opción A: Ejecutar el script SQL completo (recomendado)**

```bash
psql -U postgres -d banco_db -f script-database.sql
```

Este script creará las tablas e insertará datos de prueba (8 clientes y 13 cuentas).


### 3. Configurar el Backend

```bash
cd backend
npm install
```

**Configurar variables de entorno:**

Crear el archivo `.env` en la carpeta `backend`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=banco_db
PORT=3000
```

**Iniciar el backend:**

```bash
npm run start:dev
```

El backend estará disponible en: `http://localhost:3000`  
Documentación Swagger: `http://localhost:3000/api/docs`

### 4. Configurar el Frontend

```bash
cd frontend
npm install
```

**Iniciar el frontend:**

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 📚 Documentación de la API

Una vez iniciado el backend, accede a la documentación interactiva de Swagger:

**http://localhost:3000/api/docs**

### Endpoints Disponibles

#### Clientes
- `POST /clientes` - Crear un nuevo cliente
- `GET /clientes` - Listar todos los clientes
- `GET /clientes/:id` - Obtener cliente por ID (incluye cuentas)
- `PUT /clientes/:id` - Actualizar cliente
- `DELETE /clientes/:id` - Eliminar cliente (soft delete)

#### Cuentas
- `POST /clientes/:id/cuentas` - Abrir cuenta para un cliente
- `GET /clientes/:id/cuentas` - Listar cuentas de un cliente
- `GET /cuentas/:id` - Obtener cuenta por ID
- `PUT /cuentas/:id` - Actualizar cuenta
- `DELETE /cuentas/:id` - Eliminar cuenta (soft delete)

---

## 🎯 Funcionalidades Implementadas

### Gestión de Clientes
- ✅ Listar todos los clientes
- ✅ Crear nuevo cliente con validaciones
- ✅ Editar información del cliente
- ✅ Eliminar cliente (soft delete)
- ✅ Ver detalle del cliente con sus cuentas asociadas

### Gestión de Cuentas Bancarias
- ✅ Crear cuenta bancaria para un cliente
- ✅ Listar cuentas de un cliente específico
- ✅ Editar información de la cuenta
- ✅ Eliminar cuenta (soft delete)
- ✅ Validación de número de cuenta único
- ✅ Soporte para múltiples monedas (BOB, USD)
- ✅ Diferentes tipos de producto (Caja de Ahorro, Cuenta Corriente, DPF)

### Características Adicionales
- ✅ Soft delete en todas las entidades
- ✅ Validación de datos con Class Validator
- ✅ Notificaciones toast para feedback del usuario
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Modales para formularios y detalles
- ✅ Manejo de errores global
- ✅ IDs numéricos secuenciales (1, 2, 3...)

---

## 🗄️ Modelo de Datos

### Entidad: Cliente

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único (auto-incremental) |
| nombre | VARCHAR(100) | Nombre del cliente |
| paterno | VARCHAR(100) | Apellido paterno |
| materno | VARCHAR(100) | Apellido materno |
| tipo_documento | VARCHAR(20) | Tipo de documento (CI, Pasaporte, RUN) |
| documento_identidad | VARCHAR(50) | Número de documento (único) |
| fecha_nacimiento | DATE | Fecha de nacimiento |
| genero | VARCHAR(1) | Género (M/F) |
| fecha_creacion | TIMESTAMP | Fecha de creación del registro |
| eliminado | BOOLEAN | Marca de soft delete |

### Entidad: Cuenta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único (auto-incremental) |
| cliente_id | INTEGER | ID del cliente propietario |
| tipo_producto | VARCHAR(50) | Tipo de cuenta |
| numero_cuenta | VARCHAR(20) | Número de cuenta (único) |
| moneda | VARCHAR(3) | Moneda (BOB, USD) |
| monto | DECIMAL(15,2) | Saldo de la cuenta |
| fecha_creacion | TIMESTAMP | Fecha de apertura |
| sucursal | VARCHAR(100) | Sucursal donde se abrió |
| eliminado | BOOLEAN | Marca de soft delete |

**Relación:** Un cliente puede tener múltiples cuentas (1:N)

---

## 🧪 Pruebas

### Probar el Backend con Swagger

1. Acceder a `http://localhost:3000/api/docs`
2. Probar cada endpoint desde la interfaz de Swagger
3. Verificar las respuestas y códigos de estado

### Probar el Frontend

1. Acceder a `http://localhost:5173`
2. Crear un nuevo cliente
3. Ver el detalle del cliente
4. Agregar cuentas al cliente
5. Editar y eliminar registros

---

## 🚢 Despliegue en Producción

### Backend

Para producción, cambiar `synchronize: true` a `false` en `app.module.ts` y usar migraciones de TypeORM.

```bash
npm run build
npm run start:prod
```

### Frontend

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/` listos para desplegar en cualquier servidor web.

---

## 👥 Datos de Prueba

El script SQL incluye 8 clientes y cuentas de prueba con datos realistas para facilitar las pruebas del sistema.

---

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verificar que PostgreSQL esté corriendo
- Comprobar las credenciales en el archivo `.env`
- Verificar que la base de datos `banco_db` exista

### Puerto 3000 en uso
- Cambiar el puerto en el archivo `.env` del backend
- O detener el proceso que esté usando el puerto 3000

### CORS errors
- Verificar que el backend esté corriendo en `http://localhost:3000`
- El CORS ya está configurado para aceptar peticiones desde `http://localhost:5173`

---


**Desarrollado para la prueba práctica de Backend y Frontend**