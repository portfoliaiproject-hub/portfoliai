-- Create a test user for portfolio testing
-- Run this in your Supabase SQL Editor

INSERT INTO users (id, email, risk_score, investment_style) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'test@portfolio.com', 7.5, 'aggressive')
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    risk_score = EXCLUDED.risk_score,
    investment_style = EXCLUDED.investment_style;

-- Verify the user was created
SELECT id, email, risk_score, investment_style, created_at FROM users WHERE id = '550e8400-e29b-41d4-a716-446655440000';

