-- Supabase Database Setup Script (Safe Version)
-- Run this in your Supabase SQL Editor
-- This version handles existing tables and type conflicts

-- Check if users table exists and has correct id type
DO $$
BEGIN
    -- If users table exists but id is not UUID, we need to handle it
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        -- Check if id column is UUID type
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name = 'id' 
            AND data_type = 'uuid'
        ) THEN
            -- Drop and recreate users table if id is not UUID
            DROP TABLE IF EXISTS holdings CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        END IF;
    END IF;
END $$;

-- Create users table (will be created if doesn't exist or was dropped)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    risk_score FLOAT DEFAULT 0.0,
    investment_style VARCHAR(100) DEFAULT 'moderate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop tables if they exist (to avoid foreign key issues)
DROP TABLE IF EXISTS investor_profiles CASCADE;
DROP TABLE IF EXISTS holdings CASCADE;

-- Create holdings table
CREATE TABLE holdings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol VARCHAR(10) NOT NULL,
    shares FLOAT NOT NULL CHECK (shares > 0),
    avg_price FLOAT NOT NULL CHECK (avg_price > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, symbol)
);

-- Create investor_profiles table
CREATE TABLE investor_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    risk_score FLOAT NOT NULL CHECK (risk_score >= 0 AND risk_score <= 1),
    investment_style VARCHAR(50) NOT NULL,
    foundation_pct FLOAT NOT NULL CHECK (foundation_pct >= 0 AND foundation_pct <= 100),
    growth_pct FLOAT NOT NULL CHECK (growth_pct >= 0 AND growth_pct <= 100),
    adventurous_pct FLOAT NOT NULL CHECK (adventurous_pct >= 0 AND adventurous_pct <= 100),
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id) -- One profile per user
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_holdings_user_id ON holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_holdings_symbol ON holdings(symbol);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_user_id ON investor_profiles(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Users can read own holdings" ON holdings;
DROP POLICY IF EXISTS "Users can insert own holdings" ON holdings;
DROP POLICY IF EXISTS "Users can update own holdings" ON holdings;
DROP POLICY IF EXISTS "Users can delete own holdings" ON holdings;
DROP POLICY IF EXISTS "Users can read own profiles" ON investor_profiles;
DROP POLICY IF EXISTS "Users can insert own profiles" ON investor_profiles;
DROP POLICY IF EXISTS "Users can update own profiles" ON investor_profiles;
DROP POLICY IF EXISTS "Users can delete own profiles" ON investor_profiles;

-- Create policies for RLS (adjust based on your auth requirements)
-- For now, we'll allow all operations (you can restrict this later)

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (true);

CREATE POLICY "Users can insert own data" ON users
    FOR INSERT WITH CHECK (true);

-- Holdings policies
CREATE POLICY "Users can read own holdings" ON holdings
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own holdings" ON holdings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own holdings" ON holdings
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own holdings" ON holdings
    FOR DELETE USING (true);

-- Investor profiles policies
CREATE POLICY "Users can read own profiles" ON investor_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own profiles" ON investor_profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own profiles" ON investor_profiles
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete own profiles" ON investor_profiles
    FOR DELETE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_holdings_updated_at ON holdings;
DROP TRIGGER IF EXISTS update_investor_profiles_updated_at ON investor_profiles;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_holdings_updated_at BEFORE UPDATE ON holdings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investor_profiles_updated_at BEFORE UPDATE ON investor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO users (email, risk_score, investment_style) VALUES
    ('demo@example.com', 7.5, 'aggressive'),
    ('test@example.com', 5.0, 'moderate')
ON CONFLICT (email) DO NOTHING;

-- Insert sample holdings
INSERT INTO holdings (user_id, symbol, shares, avg_price) 
SELECT 
    u.id,
    'AAPL',
    10,
    210.00
FROM users u 
WHERE u.email = 'demo@example.com'
ON CONFLICT (user_id, symbol) DO NOTHING;

INSERT INTO holdings (user_id, symbol, shares, avg_price) 
SELECT 
    u.id,
    'MSFT',
    5,
    310.00
FROM users u 
WHERE u.email = 'demo@example.com'
ON CONFLICT (user_id, symbol) DO NOTHING;
