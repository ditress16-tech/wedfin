# System Architecture - Wedding Financial Management

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Financial   │  │   Project    │  │    Client    │      │
│  │  Dashboard   │  │  Management  │  │  Management  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     Context Layer (State)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Financial   │  │    Vendor    │  │     Auth     │      │
│  │   Context    │  │   Context    │  │   Context    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer (Mock)                       │
│  • Bank Accounts    • Projects       • Clients              │
│  • Debit Cards      • Tasks          • Leads                │
│  • Credit Cards     • Budgets        • Ratings              │
│  • Cash Balance     • Goals          • Revenue              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Component Hierarchy

```
App
├── AuthProvider
│   ├── VendorProvider
│   │   ├── FinancialProvider
│   │   │   ├── CustomizerProvider
│   │   │   │   ├── Router
│   │   │   │   │   ├── FinancialDashboard
│   │   │   │   │   │   ├── StatCard (x4)
│   │   │   │   │   │   ├── AccountCard (multiple)
│   │   │   │   │   │   ├── BudgetCard (multiple)
│   │   │   │   │   │   └── GoalCard (multiple)
│   │   │   │   │   │
│   │   │   │   │   ├── ProjectManagement
│   │   │   │   │   │   ├── StatCard (x4)
│   │   │   │   │   │   ├── Tabs
│   │   │   │   │   │   ├── ProjectCard (multiple)
│   │   │   │   │   │   └── ProjectDialog
│   │   │   │   │   │
│   │   │   │   │   └── ClientManagement
│   │   │   │   │       ├── StatCard (x4)
│   │   │   │   │       ├── Tabs
│   │   │   │   │       ├── ClientTable
│   │   │   │   │       └── ClientDialog
```

## 🔄 Data Flow Diagram

### Financial Dashboard Flow
```
User Opens Page
      ↓
Component Mounts
      ↓
useFinancial() Hook Called
      ↓
Context Returns Data
      ↓
Component Renders with Data
      ↓
User Sees Dashboard
```

### Add Project Flow
```
User Clicks "Add Project"
      ↓
Dialog Opens
      ↓
User Fills Form
      ↓
User Clicks "Save"
      ↓
addProject() Called
      ↓
Context State Updated
      ↓
Component Re-renders
      ↓
New Project Appears
```

### Financial Summary Calculation
```
getFinancialSummary() Called
      ↓
Calculate Total Balance
├── Sum all bank accounts
├── Add cash balance
└── Add digital wallets
      ↓
Calculate Total Debt
└── Sum all credit card balances
      ↓
Calculate Net Worth
└── Total Balance - Total Debt
      ↓
Calculate Monthly Revenue
└── Sum revenue this month
      ↓
Calculate Monthly Expenses
└── Sum expenses this month
      ↓
Calculate Monthly Profit
└── Revenue - Expenses
      ↓
Return Summary Object
```

## 🗂️ File Structure

```
wedding-financial-management/
│
├── src/
│   ├── views/
│   │   └── dashboard/
│   │       └── vendor/
│   │           ├── FinancialDashboard.jsx    ← Financial overview
│   │           ├── ProjectManagement.jsx     ← Project CRUD
│   │           ├── ClientManagement.jsx      ← Client CRM
│   │           ├── VendorDashboard.jsx       ← Main dashboard
│   │           ├── InvoicesBilling.jsx       ← Invoices
│   │           └── ...other pages
│   │
│   ├── context/
│   │   ├── FinancialContext.jsx              ← Financial state
│   │   ├── VendorContext.jsx                 ← Vendor state
│   │   └── AuthContext.jsx                   ← Auth state
│   │
│   ├── components/
│   │   └── vendor/
│   │       ├── StatCard.jsx                  ← Reusable stat card
│   │       ├── ProjectCard.jsx               ← Project card
│   │       └── KPICard.jsx                   ← KPI card
│   │
│   ├── utils/
│   │   └── formatters.js                     ← Utility functions
│   │
│   └── main.jsx                              ← App entry point
│
├── Documentation/
│   ├── WEDDING_FINANCIAL_MANAGEMENT.md       ← Technical docs
│   ├── PANDUAN_PENGGUNAAN.md                 ← User guide (ID)
│   ├── INTEGRATION_GUIDE.md                  ← Integration steps
│   ├── DEVELOPMENT_SUMMARY.md                ← Dev overview
│   ├── QUICK_REFERENCE.md                    ← Quick ref
│   ├── PENJELASAN_SISTEM.md                  ← System explanation (ID)
│   ├── IMPLEMENTATION_CHECKLIST.md           ← Checklist
│   └── SYSTEM_ARCHITECTURE.md                ← This file
│
└── README.md                                 ← Main readme
```

## 🎯 Context Architecture

### FinancialContext Structure
```javascript
FinancialContext
├── State
│   ├── accounts: Array<Account>
│   ├── debitCards: Array<DebitCard>
│   ├── creditCards: Array<CreditCard>
│   ├── cashBalance: Number
│   ├── digitalWallets: Array<Wallet>
│   ├── transactions: Array<Transaction>
│   ├── expenses: Array<Expense>
│   ├── revenue: Array<Revenue>
│   ├── budgets: Array<Budget>
│   ├── financialGoals: Array<Goal>
│   └── loading: Boolean
│
├── Account Functions
│   ├── addAccount()
│   ├── updateAccount()
│   └── deleteAccount()
│
├── Card Functions
│   ├── addDebitCard()
│   ├── updateDebitCard()
│   ├── addCreditCard()
│   ├── updateCreditCard()
│   └── makeCreditCardPayment()
│
├── Cash Functions
│   ├── updateCashBalance()
│   └── recordCashTransaction()
│
├── Wallet Functions
│   ├── addDigitalWallet()
│   └── updateDigitalWallet()
│
├── Expense Functions
│   ├── addExpense()
│   ├── updateExpense()
│   └── deleteExpense()
│
├── Revenue Functions
│   └── addRevenue()
│
├── Budget Functions
│   ├── addBudget()
│   └── updateBudget()
│
├── Goal Functions
│   ├── addFinancialGoal()
│   └── updateFinancialGoal()
│
└── Summary Functions
    ├── getTotalBalance()
    ├── getTotalDebt()
    └── getFinancialSummary()
```

## 🔐 Security Architecture

### Current (Mock Data)
```
User
  ↓
Frontend (React)
  ↓
Context (In-Memory State)
  ↓
Mock Data
```

### Future (Production)
```
User
  ↓
Frontend (React)
  ↓
Authentication Layer
  ↓
API Gateway
  ↓
Backend Server
  ↓
Database
```

## 📱 Responsive Design Architecture

### Breakpoints
```
Mobile:  < 600px   (xs)
Tablet:  600-960px (sm)
Desktop: > 960px   (md, lg, xl)
```

### Layout Strategy
```
Desktop (lg, xl)
├── Full sidebar
├── Multi-column grids
└── Expanded cards

Tablet (sm, md)
├── Collapsible sidebar
├── 2-column grids
└── Compact cards

Mobile (xs)
├── Bottom navigation
├── Single column
└── Stacked cards
```

## 🎨 UI Component Architecture

### Atomic Design Pattern
```
Atoms (Basic)
├── Button
├── TextField
├── Chip
└── Icon

Molecules (Combined)
├── StatCard
├── ProjectCard
└── AccountCard

Organisms (Complex)
├── ProjectGrid
├── ClientTable
└── BudgetSection

Templates (Layouts)
├── DashboardLayout
├── FormLayout
└── TableLayout

Pages (Complete)
├── FinancialDashboard
├── ProjectManagement
└── ClientManagement
```

## 🔄 State Management Flow

### Context Provider Pattern
```
Provider (FinancialProvider)
  ↓
  Provides: { state, functions }
  ↓
Consumer (useFinancial hook)
  ↓
Component uses state & functions
  ↓
User interaction triggers function
  ↓
State updates
  ↓
All consumers re-render
```

## 📊 Data Models

### Account Model
```typescript
interface Account {
  id: number;
  name: string;
  bank: string;
  balance: number;
  type: 'checking' | 'savings';
}
```

### DebitCard Model
```typescript
interface DebitCard {
  id: number;
  name: string;
  last4: string;
  balance: number;
  limit: number;
  bank: string;
}
```

### CreditCard Model
```typescript
interface CreditCard {
  id: number;
  name: string;
  last4: string;
  balance: number;
  limit: number;
  dueDate: string;
  bank: string;
}
```

### Project Model
```typescript
interface Project {
  id: number;
  name: string;
  client: string;
  weddingDate: string;
  budget: number;
  spent: number;
  status: 'planning' | 'active' | 'completed';
  progress: number;
  priority: 'high' | 'medium' | 'low';
  tasks: number;
  completedTasks: number;
  category: string;
  notes: string;
}
```

### Client Model
```typescript
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  budget: number;
  status: 'lead' | 'active' | 'completed';
  rating: number;
  projects: number;
  totalSpent: number;
  notes: string;
}
```

## 🚀 Deployment Architecture

### Development
```
Local Machine
  ↓
npm run dev
  ↓
Vite Dev Server
  ↓
http://localhost:5173
```

### Production
```
Source Code
  ↓
npm run build
  ↓
Vite Build (dist/)
  ↓
Static Files
  ↓
CDN / Web Server
  ↓
https://your-domain.com
```

## 🔧 Technology Stack

```
Frontend Framework
└── React 19

UI Library
└── Material-UI v7

State Management
└── Context API

Routing
└── React Router v7

Build Tool
└── Vite

Icons
└── Tabler Icons

Styling
└── Emotion (CSS-in-JS)

Language
└── JavaScript (ES6+)
```

## 📈 Scalability Considerations

### Current Architecture
- ✅ Component-based (easy to extend)
- ✅ Context pattern (scalable state)
- ✅ Modular structure (easy to maintain)
- ✅ Reusable components (DRY principle)

### Future Enhancements
- [ ] Redux for complex state
- [ ] GraphQL for efficient data fetching
- [ ] Microservices backend
- [ ] Caching layer
- [ ] Load balancing
- [ ] Database sharding

## 🎯 Performance Optimization

### Current
- ✅ React.memo for expensive components
- ✅ Efficient re-renders
- ✅ Lazy loading ready
- ✅ Code splitting ready

### Future
- [ ] Virtual scrolling for large lists
- [ ] Image lazy loading
- [ ] Service workers
- [ ] Progressive Web App
- [ ] Bundle optimization
- [ ] CDN integration

## 🔍 Monitoring & Analytics

### Future Implementation
```
User Actions
  ↓
Analytics Events
  ↓
Analytics Service
  ↓
Dashboard
```

### Metrics to Track
- Page views
- User interactions
- Error rates
- Performance metrics
- User flows
- Conversion rates

## ✨ Summary

This architecture provides:
- **Scalability**: Easy to add new features
- **Maintainability**: Clean code structure
- **Performance**: Optimized rendering
- **Security**: Ready for auth integration
- **Flexibility**: Modular components
- **User Experience**: Responsive & intuitive
