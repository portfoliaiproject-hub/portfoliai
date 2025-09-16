# PortfoliAI - AI-Powered Investment Assistant

A modern, intelligent investment platform that combines AI-powered chat assistance with comprehensive portfolio management. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### **AI Investment Assistant**
- **Smart Chat Interface**: AI-powered conversations for investment analysis
- **Hybrid Threads System**: Unified Chat and Idea threads with intelligent detection
- **Company Analysis**: Detailed stock analysis with company cards
- **Stock Comparisons**: Side-by-side company comparisons
- **Trading Simulation**: Demo trading with real-time portfolio updates

### **Portfolio Management**
- **Comprehensive Holdings**: Track stocks, bonds, real estate, and alternative investments
- **Advanced Filtering**: Filter by Asset Class, Sector, and Investment Strategy
- **Allocation Analysis**: Visual breakdowns by asset class, sector, and strategy
- **On-Track Monitoring**: Compare actual vs target allocations
- **Activity Tracking**: Complete transaction history and portfolio activity

### **Investment Strategy**
- **Risk-Based Categorization**: Foundation, Growth, and Adventurous strategies
- **Sector Analysis**: Technology, Healthcare, Financials, Consumer, Real Estate
- **Asset Class Management**: Equities, Bonds, Cash, Alternative Investments
- **Rebalancing Insights**: Smart recommendations for portfolio optimization

## 🏗️ Architecture Overview

### **Technology Stack**
- **Frontend**: Next.js 15.5.0 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase for authentication and data storage
- **Charts**: Recharts for data visualization
- **State Management**: React Context + Custom Hooks

### **Project Structure**
```
portfoliai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/            # Reusable React components
│   │   ├── chat/             # Chat-related components
│   │   ├── investment/       # Investment analysis components
│   │   ├── layout/           # Layout components
│   │   ├── portfolio/        # Portfolio management components
│   │   ├── risk-assessment/  # Risk assessment components
│   │   ├── settings/         # Settings components
│   │   └── ui/              # Base UI components
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries and services
│   ├── types/               # TypeScript type definitions
│   └── constants/           # Application constants
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- Supabase account (for database)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfoliai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI Configuration (for AI features)
   OPENAI_API_KEY=your_openai_api_key
   
   # Optional: Custom API endpoints
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Development Guide

### **Code Standards**

#### **TypeScript Best Practices**
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Avoid `any` types - use proper typing
- Use union types for better type safety

#### **Component Architecture**
- Follow Single Responsibility Principle
- Keep components under 200 lines
- Extract reusable logic into custom hooks
- Use composition over inheritance

#### **State Management**
- Use React Context for global state
- Prefer local state for component-specific data
- Implement proper error boundaries
- Use memoization for performance

### **File Naming Conventions**
- **Components**: PascalCase (e.g., `PortfolioOverview.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `chatService.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### **Documentation Standards**

#### **JSDoc Comments**
All functions and components should include JSDoc documentation:

```typescript
/**
 * Calculates portfolio performance metrics
 * 
 * @param holdings - Array of portfolio holdings
 * @param startDate - Start date for performance calculation
 * @param endDate - End date for performance calculation
 * @returns Object containing performance metrics
 * @throws Error if invalid date range provided
 */
function calculatePerformance(holdings: Holding[], startDate: Date, endDate: Date): PerformanceMetrics {
  // Implementation
}
```

#### **Component Documentation**
```typescript
/**
 * Portfolio overview component
 * Displays comprehensive portfolio information including metrics and performance chart
 * 
 * @param totalValue - Total portfolio value in USD
 * @param totalGain - Total portfolio gain/loss in USD
 * @param performanceData - Performance data for chart visualization
 * @returns Portfolio overview component with metrics and chart
 */
export function PortfolioOverview({ totalValue, totalGain, performanceData }: PortfolioOverviewProps) {
  // Component implementation
}
```

## 🔧 Configuration

### **Environment Variables**

#### **Required Variables**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### **Optional Variables**
```env
# OpenAI Configuration (for AI features)
OPENAI_API_KEY=your_openai_api_key

# Custom API Configuration
NEXT_PUBLIC_API_BASE_URL=your_api_base_url

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### **Database Schema**

#### **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  risk_profile JSONB
);
```

#### **Chat Sessions Table**
```sql
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'chat',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Messages Table**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'ai')),
  content TEXT,
  type TEXT DEFAULT 'text',
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🧪 Testing

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### **Test Structure**
```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
```

### **Testing Guidelines**
- Write unit tests for all utility functions
- Test custom hooks with `@testing-library/react-hooks`
- Mock external dependencies
- Aim for 80%+ code coverage

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Configure build settings for Next.js

2. **Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Ensure `NEXT_PUBLIC_` prefix for client-side variables

3. **Deploy**
   - Deploy automatically on push to main branch
   - Preview deployments for pull requests

### **Other Platforms**

#### **Netlify**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **Docker**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make your changes**
   - Follow code standards
   - Add tests for new functionality
   - Update documentation
4. **Commit your changes**
   ```bash
   git commit -m 'feat: add new portfolio analysis feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/new-feature
   ```
6. **Submit a pull request**

### **Commit Message Convention**
Use conventional commits format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

### **Pull Request Guidelines**
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Request review from maintainers

## 📝 API Documentation

### **Authentication Endpoints**

#### **Sign Up**
```typescript
POST /api/auth/signup
{
  email: string,
  password: string,
  name?: string
}
```

#### **Sign In**
```typescript
POST /api/auth/signin
{
  email: string,
  password: string
}
```

### **Chat Endpoints**

#### **Create Chat Session**
```typescript
POST /api/chat/sessions
{
  title: string,
  type: 'chat' | 'idea'
}
```

#### **Send Message**
```typescript
POST /api/chat/messages
{
  sessionId: string,
  content: string,
  type?: 'text' | 'company_card' | 'comparison_card'
}
```

### **Portfolio Endpoints**

#### **Get Portfolio**
```typescript
GET /api/portfolio
```

#### **Add Holding**
```typescript
POST /api/portfolio/holdings
{
  ticker: string,
  shares: number,
  avgPrice: number
}
```

## 🐛 Troubleshooting

### **Common Issues**

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### **TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

#### **Database Connection Issues**
- Verify Supabase credentials
- Check network connectivity
- Ensure database tables exist

### **Performance Optimization**

#### **Bundle Size**
- Use dynamic imports for large components
- Optimize images with Next.js Image component
- Implement code splitting

#### **Database Queries**
- Use proper indexing
- Implement pagination for large datasets
- Cache frequently accessed data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### **Getting Help**
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the code comments for implementation details

### **Community**
- Join our Discord server
- Follow us on Twitter
- Subscribe to our newsletter

---

**PortfoliAI** - Making intelligent investing accessible to everyone.

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*
