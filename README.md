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

## 🏗️ Project Structure

```
portfoliai/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── dashboard/                # Main dashboard pages
│   │   │   ├── layout.tsx           # Dashboard layout wrapper
│   │   │   ├── page.tsx             # Main dashboard (chat + portfolio)
│   │   │   └── portfolio/           # Portfolio-specific pages
│   │   │       └── page.tsx         # Detailed portfolio view
│   │   ├── favicon.ico              # App icon
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── components/                   # React components
│   │   ├── chat/                    # Chat-related components
│   │   │   ├── chat-area.tsx        # Main chat interface
│   │   │   ├── chat-bubble.tsx      # Individual message bubbles
│   │   │   ├── chat-input.tsx       # Message input component
│   │   │   ├── idea-choice-banner.tsx # Chat vs Idea choice UI
│   │   │   ├── idea-thread-banner.tsx # Idea thread header banner
│   │   │   ├── thread-creation-modal.tsx # New thread creation modal
│   │   │   └── thread-suggestion-banner.tsx # Thread suggestions
│   │   ├── investment/              # Investment analysis components
│   │   │   ├── company-card.tsx     # Stock analysis cards
│   │   │   └── comparison-card.tsx  # Company comparison cards
│   │   ├── layout/                  # Layout components
│   │   │   ├── app-header.tsx       # Top navigation header
│   │   │   └── app-sidebar.tsx      # Threads sidebar with filters
│   │   ├── portfolio/               # Portfolio management components
│   │   │   ├── activity-full.tsx    # Complete activity history
│   │   │   ├── allocation-section.tsx # Asset allocation charts
│   │   │   ├── holdings-table.tsx  # Holdings table with filtering
│   │   │   ├── portfolio-overview.tsx # Portfolio summary cards
│   │   │   ├── portfolio-summary.tsx # Compact portfolio view
│   │   │   └── recent-activity.tsx  # Recent transactions
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── button.tsx           # Button component
│   │   │   ├── card.tsx             # Card container component
│   │   │   ├── input.tsx            # Input field component
│   │   │   ├── progress.tsx         # Progress bar component
│   │   │   └── tabs.tsx             # Tab navigation component
│   │   └── OnTrackCard.tsx          # Portfolio allocation tracking
│   ├── constants/                   # Application constants
│   │   └── index.ts                 # Mock data, stock prices, config
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.ts               # Authentication management
│   │   ├── useChat.ts               # Chat functionality and AI responses
│   │   ├── usePortfolio.ts          # Portfolio state management
│   │   └── useThreadSuggestion.ts  # Thread suggestion logic
│   ├── lib/                         # Utility libraries
│   │   ├── services/                # API services
│   │   │   ├── chatService.ts       # Chat API integration
│   │   │   ├── portfolioService.ts  # Portfolio API integration
│   │   │   └── index.ts             # Service exports
│   │   ├── supabaseClient.ts        # Supabase database client
│   │   └── utils.ts                 # Utility functions
│   └── types/                       # TypeScript type definitions
│       └── index.ts                 # All type interfaces
├── public/                          # Static assets
│   ├── file.svg                     # File icon
│   ├── globe.svg                    # Globe icon
│   ├── next.svg                     # Next.js logo
│   ├── vercel.svg                   # Vercel logo
│   └── window.svg                   # Window icon
├── .gitignore                       # Git ignore rules
├── components.json                  # UI component configuration
├── eslint.config.mjs               # ESLint configuration
├── next-env.d.ts                   # Next.js type definitions
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs             # PostCSS configuration
├── README.md                       # This file
└── tsconfig.json                   # TypeScript configuration
```

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.5.0**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Data visualization library for charts

### **UI Components**
- **shadcn/ui**: Modern component library
- **Lucide React**: Icon library
- **React Hook Form**: Form management

### **State Management**
- **React Hooks**: Custom hooks for state management
- **useState/useEffect**: Local component state
- **useCallback/useMemo**: Performance optimization

### **Development Tools**
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler (development)

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

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
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Key Files Explained

### **Core Application Files**

#### `src/app/dashboard/page.tsx`
- **Purpose**: Main dashboard combining chat and portfolio
- **Features**: 
  - AI chat interface with thread management
  - Portfolio sidebar with real-time updates
  - Mobile-responsive design
  - Thread creation modal
  - Idea detection and choice prompts

#### `src/hooks/useChat.ts`
- **Purpose**: Chat functionality and AI response generation
- **Features**:
  - Message handling and state management
  - AI response generation for stock analysis
  - Thread type detection (Chat vs Idea)
  - Trading simulation integration
  - Demo tip system

#### `src/hooks/usePortfolio.ts`
- **Purpose**: Portfolio state management and trading
- **Features**:
  - Holdings management with categorization
  - Real-time portfolio value calculation
  - Trading simulation with activity tracking
  - Allocation updates and rebalancing
  - Smart categorization for new holdings

### **Component Architecture**

#### **Chat Components**
- `chat-area.tsx`: Main chat interface with message display
- `chat-bubble.tsx`: Individual message rendering
- `chat-input.tsx`: Message input with send functionality
- `thread-creation-modal.tsx`: New thread creation UI
- `idea-choice-banner.tsx`: Chat vs Idea decision interface

#### **Portfolio Components**
- `holdings-table.tsx`: Advanced holdings table with filtering
- `allocation-section.tsx`: Visual allocation breakdowns
- `OnTrackCard.tsx`: Portfolio allocation tracking
- `portfolio-summary.tsx`: Compact portfolio overview
- `activity-full.tsx`: Complete transaction history

#### **Layout Components**
- `app-header.tsx`: Top navigation with user info
- `app-sidebar.tsx`: Threads sidebar with category filters

### **Data Management**

#### `src/constants/index.ts`
- **Mock Data**: Demo portfolio, companies, comparisons
- **Stock Prices**: Real-time demo prices for trading
- **Configuration**: App settings and constants

#### `src/types/index.ts`
- **TypeScript Interfaces**: All data structure definitions
- **API Types**: Request/response type definitions
- **Component Props**: Type definitions for all components

## 🎯 Key Features Deep Dive

### **Hybrid Threads System**
The application features a sophisticated thread management system:

1. **Thread Types**:
   - **Chat Threads**: General conversations and quick questions
   - **Idea Threads**: Deep dive investment analysis and research

2. **Smart Detection**:
   - AI automatically detects investment-related queries
   - Prompts users to choose between Chat or Idea thread
   - Prevents repeated prompts with thread type locking

3. **Visual Indicators**:
   - 💬 for Chat threads
   - 💡 for Idea threads
   - Color-coded filtering system

### **Advanced Portfolio Management**

#### **Holdings Categorization**
Each holding is categorized by:
- **Sector**: Technology, Healthcare, Financials, Consumer, Real Estate, Cash
- **Asset Class**: Equities, Bonds, Cash, Alt/Real Estate
- **Strategy**: Foundation, Growth, Adventurous

#### **Filtering System**
- **Multi-dimensional filtering**: By asset class, sector, or strategy
- **Text search**: Search by asset name or ticker
- **Combined filtering**: Text search + category filters
- **Dynamic dropdowns**: Options update based on available data

#### **Allocation Analysis**
- **Visual charts**: Pie charts and bar charts for allocation breakdown
- **On-track monitoring**: Compare actual vs target allocations
- **Rebalancing insights**: Smart recommendations for portfolio optimization

### **AI-Powered Features**

#### **Stock Analysis**
- **Company Cards**: Detailed analysis with valuation metrics
- **Comparison Cards**: Side-by-side company comparisons
- **Risk Assessment**: Investment suitability analysis

#### **Trading Simulation**
- **Real-time Prices**: Demo stock prices for realistic trading
- **Portfolio Updates**: Automatic allocation recalculation
- **Activity Tracking**: Complete transaction history

## 🔧 Configuration

### **Environment Variables**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Optional: Custom API endpoints
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

### **Demo Data Configuration**
Edit `src/constants/index.ts` to customize:
- **Stock Prices**: Update demo prices
- **Portfolio Holdings**: Modify default holdings
- **Company Data**: Update company analysis data

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### **Other Platforms**
The app can be deployed to any platform supporting Next.js:
- **Netlify**: Configure build settings for Next.js
- **Railway**: Use Node.js environment
- **Docker**: Use provided Dockerfile

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Submit a pull request

### **Code Standards**
- Follow TypeScript best practices
- Use ESLint for code linting
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the code comments for implementation details

---

**PortfoliAI** - Making intelligent investing accessible to everyone.
