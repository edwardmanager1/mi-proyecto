-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    security_id VARCHAR(50) UNIQUE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Crear índice para security_id
CREATE INDEX IF NOT EXISTS idx_users_security_id ON users(security_id);

-- Insertar usuario de prueba (opcional)
INSERT INTO users (email, password_hash, nombre, apellido, security_id) 
VALUES (
    'admin@test.com', 
    '$2a$10$rOzZTOb6bTZ/7U6VK8yBk.FzJhJcQ1oQc8bKj6L7nRq3vXmYtL9dC',
    'Admin', 
    'Test', 
    'SEC-001'
) ON CONFLICT (email) DO NOTHING;