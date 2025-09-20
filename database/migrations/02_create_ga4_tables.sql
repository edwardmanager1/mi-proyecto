-- Migración: Crear tablas para métricas de GA4
-- Fecha: $(date)
-- Descripción: Crea tablas para almacenar métricas de Google Analytics 4

BEGIN;

-- Tabla principal de métricas
CREATE TABLE IF NOT EXISTS ga4_metrics (
    id SERIAL PRIMARY KEY,
    metric_date DATE NOT NULL UNIQUE,
    active_users INTEGER NOT NULL CHECK (active_users >= 0),
    sessions INTEGER NOT NULL CHECK (sessions >= 0),
    avg_session_duration INTERVAL NOT NULL,
    sessions_with_interaction INTEGER NOT NULL CHECK (sessions_with_interaction >= 0),
    bounce_rate DECIMAL(5, 2) NOT NULL CHECK (bounce_rate >= 0 AND bounce_rate <= 100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de auditoría para tracking de sincronizaciones
CREATE TABLE IF NOT EXISTS ga4_sync_logs (
    id SERIAL PRIMARY KEY,
    sync_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('success', 'error', 'partial')),
    records_synced INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índices para máximo rendimiento
CREATE INDEX IF NOT EXISTS idx_ga4_metrics_date ON ga4_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_ga4_metrics_created ON ga4_metrics(created_at);
CREATE INDEX IF NOT EXISTS idx_ga4_sync_logs_date ON ga4_sync_logs(sync_date);

COMMIT;