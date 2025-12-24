-- ================================================
-- Script de Creación de Base de Datos
-- Sistema de Gestión de Clientes y Cuentas Bancarias
-- ================================================

-- PASO 1: Crear la base de datos desde la base de datos postgres
-- Ejecutar esto primero conectado a la base 'postgres'

DROP DATABASE IF EXISTS banco_db;

CREATE DATABASE banco_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- ================================================
-- PASO 2: Conectar a banco_db y ejecutar el resto
-- ================================================

-- ================================================
-- TABLA: clientes
-- ================================================

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    paterno VARCHAR(100) NOT NULL,
    materno VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    documento_identidad VARCHAR(50) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(1) NOT NULL CHECK (genero IN ('M', 'F')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eliminado BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT chk_tipo_documento CHECK (tipo_documento IN ('CI', 'Pasaporte', 'RUN'))
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_clientes_documento ON clientes(documento_identidad);
CREATE INDEX idx_clientes_eliminado ON clientes(eliminado);
CREATE INDEX idx_clientes_fecha_creacion ON clientes(fecha_creacion DESC);

-- ================================================
-- TABLA: cuentas
-- ================================================

CREATE TABLE IF NOT EXISTS cuentas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    tipo_producto VARCHAR(50) NOT NULL,
    numero_cuenta VARCHAR(20) NOT NULL UNIQUE,
    moneda VARCHAR(3) NOT NULL CHECK (moneda IN ('BOB', 'USD')),
    monto DECIMAL(15, 2) DEFAULT 0.00 CHECK (monto >= 0),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sucursal VARCHAR(100) NOT NULL,
    eliminado BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE CASCADE,
    
    CONSTRAINT chk_tipo_producto 
        CHECK (tipo_producto IN ('caja de ahorro', 'cuenta corriente', 'DPF')),
    
    CONSTRAINT chk_sucursal 
        CHECK (sucursal IN ('La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 'Tarija', 'Beni', 'Pando', 'Chuquisaca'))
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_cuentas_cliente ON cuentas(cliente_id);
CREATE INDEX idx_cuentas_numero ON cuentas(numero_cuenta);
CREATE INDEX idx_cuentas_eliminado ON cuentas(eliminado);
CREATE INDEX idx_cuentas_fecha_creacion ON cuentas(fecha_creacion DESC);

-- ================================================
-- DATOS DE PRUEBA (OPCIONAL)
-- ================================================

-- Insertar clientes de prueba
INSERT INTO clientes (nombre, paterno, materno, tipo_documento, documento_identidad, fecha_nacimiento, genero)
VALUES 
    ('Juan', 'Pérez', 'García', 'CI', '12345678', '1990-05-15', 'M'),
    ('María', 'López', 'Martínez', 'CI', '87654321', '1985-08-20', 'F'),
    ('Carlos', 'Rodríguez', 'Fernández', 'CI', '11223344', '1992-03-10', 'M'),
    ('Ana', 'Sánchez', 'Torres', 'Pasaporte', 'AB123456', '1988-12-25', 'F'),
    ('Luis', 'González', 'Ramos', 'CI', '55667788', '1995-07-18', 'M'),
    ('Patricia', 'Mamani', 'Quispe', 'CI', '99887766', '1993-11-30', 'F'),
    ('Roberto', 'Flores', 'Vargas', 'CI', '44556677', '1987-09-08', 'M'),
    ('Carmen', 'Gutiérrez', 'Morales', 'CI', '33221144', '1991-04-22', 'F');

-- Insertar cuentas de prueba
INSERT INTO cuentas (cliente_id, tipo_producto, numero_cuenta, moneda, monto, sucursal)
VALUES 
    -- Cliente 1 (Juan Pérez) - 2 cuentas
    (1, 'caja de ahorro', '1000000001', 'BOB', 5000.00, 'La Paz'),
    (1, 'cuenta corriente', '1000000002', 'USD', 2500.00, 'La Paz'),
    
    -- Cliente 2 (María López) - 1 cuenta
    (2, 'cuenta corriente', '2000000001', 'USD', 3500.00, 'Santa Cruz'),
    
    -- Cliente 3 (Carlos Rodríguez) - 2 cuentas
    (3, 'DPF', '3000000001', 'BOB', 15000.00, 'Cochabamba'),
    (3, 'caja de ahorro', '3000000002', 'BOB', 8000.00, 'Cochabamba'),
    
    -- Cliente 4 (Ana Sánchez) - 1 cuenta
    (4, 'caja de ahorro', '4000000001', 'BOB', 12000.00, 'Oruro'),
    
    -- Cliente 5 (Luis González) - 3 cuentas
    (5, 'cuenta corriente', '5000000001', 'USD', 4500.00, 'La Paz'),
    (5, 'caja de ahorro', '5000000002', 'BOB', 6500.00, 'La Paz'),
    (5, 'DPF', '5000000003', 'USD', 20000.00, 'La Paz'),
    
    -- Cliente 6 (Patricia Mamani) - 1 cuenta
    (6, 'caja de ahorro', '6000000001', 'BOB', 7800.00, 'Potosí'),
    
    -- Cliente 7 (Roberto Flores) - 2 cuentas
    (7, 'cuenta corriente', '7000000001', 'BOB', 9500.00, 'Tarija'),
    (7, 'caja de ahorro', '7000000002', 'USD', 3200.00, 'Tarija'),
    
    -- Cliente 8 (Carmen Gutiérrez) - 1 cuenta
    (8, 'DPF', '8000000001', 'BOB', 25000.00, 'Beni');

-- ================================================
-- COMENTARIOS EN TABLAS Y COLUMNAS
-- ================================================

COMMENT ON TABLE clientes IS 'Tabla de clientes del banco';
COMMENT ON COLUMN clientes.id IS 'Identificador único del cliente (auto-incremental)';
COMMENT ON COLUMN clientes.documento_identidad IS 'Documento de identidad único del cliente';
COMMENT ON COLUMN clientes.eliminado IS 'Marca de eliminación lógica (soft delete)';

COMMENT ON TABLE cuentas IS 'Tabla de cuentas bancarias';
COMMENT ON COLUMN cuentas.id IS 'Identificador único de la cuenta (auto-incremental)';
COMMENT ON COLUMN cuentas.numero_cuenta IS 'Número único de cuenta bancaria';
COMMENT ON COLUMN cuentas.monto IS 'Saldo disponible en la cuenta';
COMMENT ON COLUMN cuentas.eliminado IS 'Marca de eliminación lógica (soft delete)';
