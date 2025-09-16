# Portfolio Backend Setup Guide

## ✅ Milestone 2 Complete: Supabase Integration
## ✅ Milestone 3 Complete: Investor Profile Generation  
## ✅ Milestone 4 Complete: Asset Recommendations

The backend now includes Supabase integration for portfolio management, investor profile generation, and personalized asset recommendations.

## 🗄️ Database Setup Required

Before using the portfolio endpoints, you need to create the Supabase tables:

### 1. Go to your Supabase Dashboard
- Navigate to your Supabase project
- Go to the SQL Editor

### 2. Run the Setup Script

**Option A: Clean Setup (Recommended)**
If you don't have existing tables or want to start fresh:
- Copy and paste the contents of `supabase-setup.sql` into the SQL Editor and execute it.

**Option B: Safe Setup (If you have existing tables)**
If you have existing tables that might conflict:
- Copy and paste the contents of `supabase-setup-safe.sql` into the SQL Editor and execute it.
- This version handles existing tables and type conflicts automatically.

This will create:
- `users` table with fields: id (uuid), email, risk_score (float), investment_style (string), created_at (timestamp)
- `holdings` table with fields: id (uuid), user_id (uuid ref users.id), symbol (string), shares (float), avg_price (float), created_at (timestamp)
- `investor_profiles` table with fields: id (uuid), user_id (uuid ref users.id), risk_score (float), investment_style (string), foundation_pct (float), growth_pct (float), adventurous_pct (float), explanation (text), created_at (timestamp)
- Proper indexes and Row Level Security policies
- Sample data for testing

## 🚀 New API Endpoints

### POST /api/portfolio/add
Add or update a holding in the user's portfolio.

**Request Body:**
```json
{
  "userId": "demo-user-123",
  "symbol": "AAPL", 
  "shares": 10,
  "avgPrice": 210.00
}
```

**Response:**
```json
{
  "message": "Holding added successfully",
  "holding": {
    "id": "uuid-here",
    "user_id": "demo-user-123",
    "symbol": "AAPL",
    "shares": 10,
    "avg_price": 210.00,
    "created_at": "2025-01-10T14:00:00Z"
  }
}
```

### GET /api/portfolio/:userId
Get all holdings for a user with current market prices.

**Response:**
```json
[
  {
    "symbol": "AAPL",
    "shares": 10,
    "avg_price": 210.00,
    "current_price": 229.05,
    "total_value": 2290.50,
    "gain_loss": 190.50,
    "gain_loss_percent": 9.07
  },
  {
    "symbol": "MSFT", 
    "shares": 5,
    "avg_price": 310.00,
    "current_price": 322.10,
    "total_value": 1610.50,
    "gain_loss": 60.50,
    "gain_loss_percent": 3.90
  }
]
```

### POST /api/profile/generate
Generate an investor profile based on risk assessment answers.

**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "riskAnswers": [1, 2, 3, 4, 5]
}
```

**Response:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "risk_score": 0.65,
  "investment_style": "Balanced",
  "foundation_pct": 50,
  "growth_pct": 40,
  "adventurous_pct": 10,
  "explanation": "You are a balanced investor seeking growth but with safety."
}
```

### GET /api/profile/:userId
Get the latest investor profile for a user.

**Response:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "risk_score": 0.65,
  "investment_style": "Balanced",
  "foundation_pct": 50,
  "growth_pct": 40,
  "adventurous_pct": 10,
  "explanation": "You are a balanced investor seeking growth but with safety.",
  "created_at": "2025-01-10T14:00:00Z",
  "updated_at": "2025-01-10T14:00:00Z"
}
```

### GET /api/recommendations/:userId
Get personalized asset recommendations based on investor profile.

**Response:**
```json
{
  "foundation": [
    {
      "symbol": "BND",
      "companyName": "Vanguard Total Bond Market ETF",
      "reason": "Stable bond ETF for safety and capital preservation"
    }
  ],
  "growth": [
    {
      "symbol": "SPY",
      "companyName": "SPDR S&P 500 ETF Trust",
      "reason": "Broad market ETF for diversified growth exposure"
    }
  ],
  "adventurous": [
    {
      "symbol": "AAPL",
      "companyName": "Apple Inc.",
      "reason": "High growth potential with strong fundamentals"
    }
  ]
}
```

## 🧪 Testing Commands

After setting up the database tables:

### Test Portfolio Add
```bash
curl -X POST http://localhost:4000/api/portfolio/add \
  -H "Content-Type: application/json" \
  -d '{"userId": "demo-user-123", "symbol": "AAPL", "shares": 10, "avgPrice": 210.00}'
```

### Test Portfolio Get
```bash
curl http://localhost:4000/api/portfolio/demo-user-123
```

### Test Update Existing Holding
```bash
curl -X POST http://localhost:4000/api/portfolio/add \
  -H "Content-Type: application/json" \
  -d '{"userId": "demo-user-123", "symbol": "AAPL", "shares": 15, "avgPrice": 215.00}'
```

### Test Investor Profile Generation
```bash
curl -X POST http://localhost:4000/api/profile/generate \
  -H "Content-Type: application/json" \
  -d '{"userId": "550e8400-e29b-41d4-a716-446655440000", "riskAnswers": [1, 2, 3, 4, 5]}'
```

### Test Get Investor Profile
```bash
curl http://localhost:4000/api/profile/550e8400-e29b-41d4-a716-446655440000
```

### Test Asset Recommendations
```bash
curl http://localhost:4000/api/recommendations/550e8400-e29b-41d4-a716-446655440000
```

## 🔧 Features Implemented

### Milestone 2: Portfolio Management
✅ **Supabase Client Integration** - Connected to your existing Supabase project  
✅ **Database Tables** - Users, holdings, and investor_profiles tables with proper relationships  
✅ **Portfolio Add Endpoint** - Insert/update holdings with validation  
✅ **Portfolio Get Endpoint** - Fetch holdings with real-time market prices  
✅ **Error Handling** - Comprehensive error handling with Supabase error logging  
✅ **Data Validation** - Input validation for all required fields  
✅ **Caching Integration** - Uses existing cache for market price lookups  
✅ **Upsert Logic** - Updates existing holdings or creates new ones

### Milestone 3: Investor Profile Generation
✅ **Risk Assessment Simulation** - Random risk scoring with realistic ranges  
✅ **Investment Style Mapping** - Conservative, Balanced, Growth Seeker classifications  
✅ **Portfolio Allocation** - Foundation/Growth/Adventurous percentage recommendations  
✅ **Profile Persistence** - Store and retrieve investor profiles in Supabase  
✅ **Profile Updates** - Upsert logic for updating existing profiles  

### Milestone 4: Asset Recommendations
✅ **Real-time Asset Data** - FMP API integration for live company information  
✅ **Personalized Recommendations** - Based on investor profile allocation buckets  
✅ **Foundation Assets** - Bond ETFs for conservative allocation  
✅ **Growth Assets** - Broad market ETFs for balanced growth  
✅ **Adventurous Assets** - High-growth stocks for aggressive allocation  
✅ **Caching Optimization** - Efficient API usage with caching  

## 🎯 Next Steps

1. **Run the SQL setup script** in your Supabase dashboard
2. **Test the endpoints** using the curl commands above
3. **Integrate with frontend** - Update your React app to use these new endpoints
4. **Add authentication** - Implement proper user authentication and RLS policies

The backend is now ready for full portfolio management! 🚀
