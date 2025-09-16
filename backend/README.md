# PortfoliAI Backend

Node.js + Express backend for the PortfoliAI application with Financial Modeling Prep API integration.

## Features

- ✅ Express.js server with CORS support
- ✅ Rate limiting (120 requests/hour per IP)
- ✅ In-memory caching (60s TTL)
- ✅ Financial Modeling Prep API integration
- ✅ Normalized API responses
- ✅ Cache hit/miss headers
- ✅ Error handling and validation

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Financial Modeling Prep API key:
   ```
   PORT=4000
   FMP_API_KEY=your_actual_api_key_here
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
```bash
GET /health
```

### Quote Data
```bash
GET /api/quote/:symbol
```

### Company Profile
```bash
GET /api/profile/:symbol
```

## Testing

Use the curl commands below to test the endpoints:

### Health Check
```bash
curl http://localhost:4000/health
```

### Quote Data
```bash
curl http://localhost:4000/api/quote/AAPL
```

### Company Profile
```bash
curl http://localhost:4000/api/profile/AAPL
```

### Test Cache (run twice to see cache hit)
```bash
curl -v http://localhost:4000/api/quote/AAPL
```

## Response Format

### Quote Response
```json
{
  "symbol": "AAPL",
  "price": 175.34,
  "change": -1.2,
  "volume": 45212000,
  "timestamp": 1694304000
}
```

### Profile Response
```json
{
  "companyName": "Apple Inc.",
  "symbol": "AAPL",
  "image": "https://logo.clearbit.com/apple.com",
  "exchangeFullName": "NASDAQ",
  "industry": "Consumer Electronics",
  "sector": "Technology",
  "ceo": "Tim Cook",
  "price": 175.34,
  "changePercentage": -0.68,
  "marketCap": 2760000000000,
  "description": "Apple Inc. designs, manufactures, and markets...",
  "website": "https://www.apple.com"
}
```

## Headers

All responses include:
- `X-Cache: HIT` - Data served from cache
- `X-Cache: MISS` - Data fetched from API

## Rate Limiting

- 120 requests per hour per IP address
- Exceeded limit returns 429 status with retry information
