# Wedding Financial Management System

## 🎯 Overview
Sistem manajemen keuangan wedding yang komprehensif untuk vendor dengan fitur lengkap untuk mengelola:
- **Financial Management** - Manajemen keuangan multi-akun
- **Client Management** - Manajemen klien dan leads
- **Project Management** - Manajemen proyek wedding
- **Payment Methods** - Debit card, credit card, cash, digital wallet
- **Budget & Goals** - Perencanaan budget dan target keuangan

## 📊 Fitur Utama

### 1. Financial Dashboard
Dashboard keuangan lengkap dengan:
- Total balance dari semua akun
- Net worth (balance - debt)
- Monthly revenue & profit
- Overview semua payment methods
- Budget tracking
- Financial goals progress

### 2. Multi-Account Management
**Bank Accounts:**
- Checking accounts
- Savings accounts
- Real-time balance tracking
- Transaction history

**Debit Cards:**
- Multiple debit card support
- Balance monitoring
- Spending limits
- Transaction categorization

**Credit Cards:**
- Credit limit tracking
- Payment due dates
- Interest calculations
- Available credit monitoring

**Cash Management:**
- Cash on hand tracking
- Cash transaction recording
- Daily reconciliation
- Petty cash management

**Digital Wallets:**
- PayPal integration
- Stripe account
- E-wallet balance monitoring
- Digital payment tracking

### 3. Project Management
Manajemen proyek wedding dengan:
- Project timeline
- Budget tracking per project
- Task management
- Progress monitoring
- Client assignment
- Status tracking (planning, active, completed)
- Priority levels
- Notes & documentation

### 4. Client Management
Sistem CRM untuk klien:
- Client database
- Contact information
- Wedding date tracking
- Budget & spending history
- Client ratings
- Lead management
- Communication history
- Referral tracking

### 5. Budget & Goals
**Budget Planning:**
- Category-wise budgets
- Monthly/quarterly budgets
- Budget vs actual tracking
- Spending alerts
- Variance analysis

**Financial Goals:**
- Revenue targets
- Savings goals
- Equipment purchase planning
- Progress tracking
- Deadline monitoring

## 🏗️ Struktur File Baru

```
src/
├── views/
│   └── dashboard/
│       └── vendor/
│           ├── FinancialDashboard.jsx (NEW)
│           ├── ProjectManagement.jsx (NEW)
│           ├── ClientManagement.jsx (NEW)
│           ├── VendorDashboard.jsx (EXISTING)
│           └── InvoicesBilling.jsx (EXISTING)
├── context/
│   ├── FinancialContext.jsx (NEW)
│   ├── VendorContext.jsx (EXISTING)
│   └── AuthContext.jsx (EXISTING)
└── utils/
    └── formatters.js (EXISTING)
```

## 🚀 Cara Menggunakan

### 1. Setup Context Providers
Tambahkan FinancialProvider di App.jsx:

```jsx
import { FinancialProvider } from './context/FinancialContext';

function App() {
  return (
    <AuthProvider>
      <VendorProvider>
        <FinancialProvider>
          {/* Your app components */}
        </FinancialProvider>
      </VendorProvider>
    </AuthProvider>
  );
}
```

### 2. Gunakan Financial Context
Di komponen manapun:

```jsx
import { useFinancial } from '../context/FinancialContext';

function MyComponent() {
  const {
    accounts,
    debitCards,
    creditCards,
    cashBalance,
    getFinancialSummary
  } = useFinancial();
  
  const summary = getFinancialSummary();
  // Use financial data
}
```

### 3. Tambahkan Routes
Update routing untuk halaman baru:

```jsx
// In your router configuration
{
  path: '/vendor/financial',
  element: <FinancialDashboard />
},
{
  path: '/vendor/projects',
  element: <ProjectManagement />
},
{
  path: '/vendor/clients',
  element: <ClientManagement />
}
```

## 📱 Fitur yang Tersedia

### Financial Dashboard
- ✅ Total balance overview
- ✅ Net worth calculation
- ✅ Monthly revenue & profit
- ✅ Bank accounts display
- ✅ Debit cards management
- ✅ Credit cards with limit tracking
- ✅ Cash balance
- ✅ Budget tracking with progress bars
- ✅ Financial goals with deadlines

### Project Management
- ✅ Project grid view
- ✅ Status filtering (all, active, planning, completed)
- ✅ Budget tracking per project
- ✅ Task completion tracking
- ✅ Progress bars
- ✅ Priority levels
- ✅ Add/Edit/Delete projects
- ✅ Wedding date tracking

### Client Management
- ✅ Client database table
- ✅ Contact information
- ✅ Status tracking (lead, active, completed)
- ✅ Budget & spending history
- ✅ Client ratings
- ✅ Add/Edit/Delete clients
- ✅ Filter by status
- ✅ Total revenue calculation

## 🎨 Komponen UI

### StatCard
Komponen untuk menampilkan statistik dengan icon:
```jsx
<StatCard
  title="Total Balance"
  value="$70,000"
  subtitle="All accounts"
  icon={IconWallet}
  color="#5D87FF"
  bgColor="rgba(93, 135, 255, 0.1)"
/>
```

### Account Cards
Kartu untuk menampilkan akun dengan styling berbeda:
- Bank accounts: Grey background
- Debit cards: Primary color
- Credit cards: Warning color with progress bar
- Cash: Success color

## 🔄 Data Flow

```
User Action
    ↓
Component (View)
    ↓
Context Hook (useFinancial)
    ↓
Context State Update
    ↓
Re-render Components
```

## 📊 Financial Summary Calculation

```javascript
const summary = {
  totalBalance: accounts + cash + wallets,
  totalDebt: creditCards.balance,
  netWorth: totalBalance - totalDebt,
  monthlyRevenue: sum(revenue this month),
  monthlyExpenses: sum(expenses this month),
  monthlyProfit: revenue - expenses
};
```

## 🎯 Next Steps

### Implementasi Backend (Recommended)
1. Setup API endpoints untuk financial data
2. Database schema untuk accounts, transactions
3. Authentication & authorization
4. Real-time balance updates
5. Transaction history

### Fitur Tambahan yang Bisa Dikembangkan
1. **Transaction Management**
   - Add/edit/delete transactions
   - Transaction categorization
   - Receipt upload
   - Recurring transactions

2. **Reports & Analytics**
   - Profit & Loss statements
   - Cash flow reports
   - Tax reports
   - Custom report builder

3. **Banking Integration**
   - Connect to real bank accounts
   - Auto-sync transactions
   - Bank reconciliation

4. **Invoice Management** (Already exists)
   - Enhanced with payment tracking
   - Multiple payment methods
   - Automated reminders

5. **Budget Alerts**
   - Email notifications
   - Budget overspending alerts
   - Goal achievement notifications

6. **Multi-Currency Support**
   - Currency conversion
   - Multi-currency accounts
   - Exchange rate tracking

## 🔐 Security Considerations

1. **Data Encryption**
   - Encrypt sensitive financial data
   - Secure API communications
   - Token-based authentication

2. **Access Control**
   - Role-based permissions
   - Vendor-specific data isolation
   - Audit logs

3. **Backup & Recovery**
   - Regular data backups
   - Disaster recovery plan
   - Data export functionality

## 📝 Notes

- Semua data saat ini menggunakan mock data
- Untuk production, integrasikan dengan backend API
- Pastikan compliance dengan regulasi keuangan
- Implementasikan proper error handling
- Add loading states untuk better UX
