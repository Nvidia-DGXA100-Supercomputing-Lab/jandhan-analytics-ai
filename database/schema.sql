-- JanDhan Analytics AI - Database Schema
-- This file contains the complete database schema for the application

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'citizen',
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ix_users_email ON users(email);
CREATE INDEX IF NOT EXISTS ix_users_id ON users(id);

-- Schemes table
CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    budget FLOAT,
    beneficiaries INTEGER,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    category VARCHAR(100),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    spent FLOAT DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ix_schemes_id ON schemes(id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scheme VARCHAR(255),
    department VARCHAR(255),
    amount FLOAT,
    status VARCHAR(50),
    date VARCHAR(50),
    recipient_name VARCHAR(255),
    recipient_account VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ix_transactions_id ON transactions(id);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    date VARCHAR(50),
    size VARCHAR(50),
    url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ix_reports_id ON reports(id);
