-- JanDhan Analytics AI - Seed Data
-- This file contains sample data for development and testing

-- Insert admin user (password: admin123)
INSERT OR IGNORE INTO users (email, hashed_password, name, role) VALUES (
    'admin@jandhan.gov.in',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqGqJqJqJq',
    'Admin User',
    'admin'
);

-- Insert sample schemes
INSERT OR IGNORE INTO schemes (name, department, budget, beneficiaries, description, status, category, start_date, end_date) VALUES
('PM Awas Yojana', 'Housing', 500000000, 2000000, 'Housing for all scheme', 'active', 'Housing', '2024-01-01', '2026-12-31'),
('Ujjwala Yojana', 'Energy', 300000000, 5000000, 'Free LPG connections', 'active', 'Energy', '2024-01-01', '2025-12-31'),
('Ayushman Bharat', 'Health', 800000000, 10000000, 'Health insurance for poor', 'active', 'Health', '2024-01-01', '2027-12-31'),
('PM Kisan', 'Agriculture', 600000000, 7500000, 'Income support to farmers', 'active', 'Agriculture', '2024-01-01', '2025-12-31'),
('Digital India', 'Technology', 200000000, 3000000, 'Digital infrastructure', 'active', 'Technology', '2024-01-01', '2026-12-31'),
('Swachh Bharat', 'Sanitation', 150000000, 4000000, 'Clean India mission', 'active', 'Sanitation', '2024-01-01', '2025-12-31'),
('Make in India', 'Industry', 400000000, 1500000, 'Boost manufacturing', 'active', 'Industry', '2024-01-01', '2027-12-31'),
('Skill India', 'Education', 250000000, 5000000, 'Skill development', 'active', 'Education', '2024-01-01', '2026-12-31');

-- Insert sample transactions
INSERT OR IGNORE INTO transactions (scheme, department, amount, status, date, recipient_name, recipient_account) VALUES
('PM Awas Yojana', 'Housing', 2500000, 'completed', '2024-01-15', 'Rajesh Kumar', '1234567890'),
('PM Awas Yojana', 'Housing', 1800000, 'completed', '2024-02-10', 'Sunita Devi', '1234567891'),
('PM Awas Yojana', 'Housing', 3200000, 'completed', '2024-03-05', 'Anil Sharma', '1234567892'),
('Ujjwala Yojana', 'Energy', 1200000, 'completed', '2024-01-20', 'Priya Singh', '1234567893'),
('Ujjwala Yojana', 'Energy', 950000, 'pending', '2024-02-15', 'Vikram Patel', '1234567894'),
('Ayushman Bharat', 'Health', 4500000, 'completed', '2024-01-25', 'Meera Joshi', '1234567895'),
('Ayushman Bharat', 'Health', 3800000, 'completed', '2024-03-10', 'Rahul Verma', '1234567896'),
('PM Kisan', 'Agriculture', 2100000, 'completed', '2024-02-01', 'Kavita Reddy', '1234567897'),
('PM Kisan', 'Agriculture', 1900000, 'completed', '2024-03-15', 'Sanjay Gupta', '1234567898'),
('Digital India', 'Technology', 800000, 'completed', '2024-01-30', 'Neha Agarwal', '1234567899'),
('Digital India', 'Technology', 750000, 'pending', '2024-02-20', 'Rohit Malhotra', '1234567900'),
('Swachh Bharat', 'Sanitation', 1100000, 'completed', '2024-01-10', 'Pooja Nair', '1234567901'),
('Swachh Bharat', 'Sanitation', 1300000, 'completed', '2024-03-20', 'Arun Iyer', '1234567902'),
('Make in India', 'Industry', 5600000, 'completed', '2024-02-05', 'Deepak Khanna', '1234567903'),
('Make in India', 'Industry', 4800000, 'pending', '2024-03-01', 'Shalini Rao', '1234567904'),
('Skill India', 'Education', 1700000, 'completed', '2024-01-18', 'Manoj Pillai', '1234567905'),
('Skill India', 'Education', 1400000, 'completed', '2024-02-25', 'Ritu Bhatt', '1234567906'),
('PM Awas Yojana', 'Housing', 900000, 'completed', '2024-03-12', 'Suresh Thakur', '1234567907'),
('Ayushman Bharat', 'Health', 2200000, 'completed', '2024-02-28', 'Geeta Rawat', '1234567908'),
('PM Kisan', 'Agriculture', 3100000, 'pending', '2024-03-08', 'Vinod Chauhan', '1234567909');

-- Insert sample reports
INSERT OR IGNORE INTO reports (name, type, date, size, url, status) VALUES
('Q1 2024 Executive Summary', 'pdf', '2024-03-31', '2.4 MB', '/reports/q1-2024.pdf', 'completed'),
('February Spending Analysis', 'csv', '2024-02-28', '1.1 MB', '/reports/feb-2024.csv', 'completed'),
('Annual Budget Review 2023', 'pdf', '2024-01-15', '5.2 MB', '/reports/annual-2023.pdf', 'completed');
