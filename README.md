# Wedding Financial Management System 💍💰

Sistem manajemen keuangan wedding yang komprehensif untuk vendor dengan fitur lengkap untuk mengelola keuangan, klien, dan proyek.

## 🎯 Fitur Utama

### 💰 Financial Management
- **Multi-Account Management**: Bank accounts, debit cards, credit cards, cash, digital wallets
- **Real-time Balance Tracking**: Monitor semua akun dalam satu dashboard
- **Budget Planning**: Set dan track budget per kategori
- **Financial Goals**: Target keuangan dengan progress tracking
- **Net Worth Calculation**: Total balance - debt

### 👥 Client Management
- **Client Database**: Manajemen data klien lengkap
- **Lead Tracking**: Track prospek dan konversi
- **Client Ratings**: Rating dan feedback dari klien
- **Communication History**: Log komunikasi dengan klien
- **Revenue per Client**: Track spending history

### 📋 Project Management
- **Wedding Projects**: Manajemen proyek wedding lengkap
- **Budget Tracking**: Monitor budget vs actual per project
- **Task Management**: Track tasks dan progress
- **Timeline Management**: Wedding date dan milestone tracking
- **Status Tracking**: Planning, active, completed

### 📊 Vendor Dashboard
- **Category-Specific**: Photography, Makeup, Catering, Venue
- **KPI Tracking**: Revenue, projects, client satisfaction
- **Analytics**: Performance metrics dan trends
- **Invoices & Billing**: Invoice management system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── views/
│   └── dashboard/
│       └── vendor/
│           ├── FinancialDashboard.jsx    # Financial overview
│           ├── ProjectManagement.jsx     # Project management
│           ├── ClientManagement.jsx      # Client CRM
│           ├── VendorDashboard.jsx       # Main dashboard
│           ├── InvoicesBilling.jsx       # Invoice system
│           └── ...
├── context/
│   ├── FinancialContext.jsx             # Financial state management
│   ├── VendorContext.jsx                # Vendor data management
│   └── AuthContext.jsx                  # Authentication
├── components/
│   └── vendor/
│       ├── StatCard.jsx                 # Reusable stat card
│       ├── ProjectCard.jsx              # Project card component
│       └── KPICard.jsx                  # KPI card component
└── utils/
    └── formatters.js                    # Utility functions
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Material-UI (MUI) v7** - Component library
- **React Router v7** - Routing
- **Vite** - Build tool
- **Context API** - State management
- **Tabler Icons** - Icon library

## 📚 Documentation

- [WEDDING_FINANCIAL_MANAGEMENT.md](./WEDDING_FINANCIAL_MANAGEMENT.md) - Dokumentasi lengkap sistem financial
- [MULTI_VENDOR_DASHBOARD_FLOW.md](./MULTI_VENDOR_DASHBOARD_FLOW.md) - Flow dan struktur vendor dashboard
- [REFACTORING_NOTES.md](./REFACTORING_NOTES.md) - Catatan refactoring dan komponen reusable

## 🎨 Vendor Categories

Sistem mendukung 4 kategori vendor:
1. **Photography** - Wedding photography services
2. **Makeup Artist** - Bridal makeup services
3. **Catering** - Wedding catering services
4. **Venue** - Wedding venue rental

Setiap kategori memiliki dashboard dan fitur yang disesuaikan dengan kebutuhan bisnis mereka.

## 🔐 Authentication

Sistem menggunakan role-based authentication:
- **Wedding Planner** - Full access ke semua vendor
- **Vendor** - Access terbatas ke data mereka sendiri

## 📊 Key Features Detail

### Financial Dashboard
- Total balance dari semua akun
- Net worth calculation (balance - debt)
- Monthly revenue & profit tracking
- Multi-account overview (bank, cards, cash, wallets)
- Budget tracking dengan progress bars
- Financial goals dengan deadline tracking

### Project Management
- Grid view dengan filtering
- Budget vs actual tracking
- Task completion monitoring
- Progress bars per project
- Priority levels (high, medium, low)
- Status tracking (planning, active, completed)

### Client Management
- Comprehensive client database
- Lead to client conversion tracking
- Client ratings dan feedback
- Revenue per client
- Communication history
- Wedding date tracking

## 🚀 Next Steps

1. **Backend Integration**
   - Setup API endpoints
   - Database schema
   - Real-time sync

2. **Advanced Features**
   - Transaction management
   - Reports & analytics
   - Banking integration
   - Multi-currency support

3. **Mobile App**
   - React Native version
   - Progressive Web App

## 📝 License

This project is private and proprietary.

## 👥 Support

For support, email [your-email] or create an issue in the repository.
