# Quick Reference - Wedding Financial Management

## 🚀 Quick Start
```bash
npm install
npm run dev
```

## 📁 File Locations

### New Files Created
```
src/
├── context/
│   └── FinancialContext.jsx          # Financial state management
├── views/dashboard/vendor/
│   ├── FinancialDashboard.jsx        # Financial overview page
│   ├── ProjectManagement.jsx         # Project management page
│   └── ClientManagement.jsx          # Client CRM page
```

### Documentation
```
WEDDING_FINANCIAL_MANAGEMENT.md       # Technical documentation
PANDUAN_PENGGUNAAN.md                 # User guide (Indonesian)
INTEGRATION_GUIDE.md                  # Integration steps
DEVELOPMENT_SUMMARY.md                # Development overview
QUICK_REFERENCE.md                    # This file
```

## 🔧 Integration Checklist

### Already Done ✅
- [x] FinancialContext created
- [x] FinancialProvider added to main.jsx
- [x] 3 new view components created
- [x] Documentation completed

### To Do ⏳
- [ ] Add routes to Router.js
- [ ] Update MenuItems.js
- [ ] Test all pages
- [ ] Connect to backend (future)

## 📝 Code Snippets

### Using Financial Context
```jsx
import { useFinancial } from '../context/FinancialContext';

function MyComponent() {
  const {
    accounts,
    debitCards,
    creditCards,
    getFinancialSummary
  } = useFinancial();
  
  const summary = getFinancialSummary();
  // Use data
}
```

### Adding Routes
```jsx
// In Router.js
import FinancialDashboard from '../views/dashboard/vendor/FinancialDashboard';
import ProjectManagement from '../views/dashboard/vendor/ProjectManagement';
import ClientManagement from '../views/dashboard/vendor/ClientManagement';

// Add routes
{
  path: '/dashboards/vendor/financial',
  element: <FinancialDashboard />
},
{
  path: '/dashboards/vendor/projects',
  element: <ProjectManagement />
},
{
  path: '/dashboards/vendor/clients',
  element: <ClientManagement />
}
```

### Adding Menu Items
```jsx
// In MenuItems.js
import { IconWallet, IconBriefcase, IconUsers } from '@tabler/icons-react';

{
  id: 'financial',
  title: 'Financial',
  icon: IconWallet,
  href: '/dashboards/vendor/financial',
},
{
  id: 'projects',
  title: 'Projects',
  icon: IconBriefcase,
  href: '/dashboards/vendor/projects',
},
{
  id: 'clients',
  title: 'Clients',
  icon: IconUsers,
  href: '/dashboards/vendor/clients',
}
```

## 🎯 Key Features

### Financial Dashboard
- Total balance, net worth, revenue, profit
- Bank accounts, debit/credit cards, cash, wallets
- Budget tracking, financial goals

### Project Management
- Project grid with filtering
- Budget vs actual tracking
- Task completion monitoring
- Add/Edit/Delete projects

### Client Management
- Client database table
- Lead tracking
- Revenue per client
- Add/Edit/Delete clients

## 🔍 URLs

```
Financial Dashboard:  /dashboards/vendor/financial
Project Management:   /dashboards/vendor/projects
Client Management:    /dashboards/vendor/clients
```

## 💡 Common Tasks

### Add New Account
```jsx
const { addAccount } = useFinancial();
addAccount({
  name: 'Business Checking',
  bank: 'Bank ABC',
  balance: 50000,
  type: 'checking'
});
```

### Add New Project
```jsx
// Use the Add Project button in UI
// Or programmatically:
const newProject = {
  name: 'Wedding Project',
  client: 'Client Name',
  weddingDate: '2024-12-31',
  budget: 50000,
  status: 'planning'
};
```

### Get Financial Summary
```jsx
const { getFinancialSummary } = useFinancial();
const summary = getFinancialSummary();
// Returns: { totalBalance, netWorth, monthlyRevenue, etc. }
```

## 🐛 Troubleshooting

### Error: Cannot find module
- Check import paths
- Verify file exists
- Restart dev server

### Data not showing
- Check console for errors
- Verify context provider in main.jsx
- Check mock data in FinancialContext

### Styling issues
- Clear browser cache
- Check Material-UI theme
- Verify responsive breakpoints

## 📚 Documentation Links

- **Full Documentation**: WEDDING_FINANCIAL_MANAGEMENT.md
- **User Guide**: PANDUAN_PENGGUNAAN.md
- **Integration**: INTEGRATION_GUIDE.md
- **Development**: DEVELOPMENT_SUMMARY.md

## 🎨 Customization

### Change Colors
```jsx
// In component
<Box sx={{ bgcolor: 'primary.light' }}>
  // Options: primary, success, warning, error, info
</Box>
```

### Modify Mock Data
```jsx
// In FinancialContext.jsx
const initializeMockData = () => {
  setAccounts([
    // Your custom data
  ]);
};
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📞 Support

- Check documentation files
- Review code comments
- Create issue in repository
- Contact development team

## 🎯 Roadmap

**Phase 1** (Current):
- ✅ Financial management
- ✅ Project management
- ✅ Client management

**Phase 2** (Next):
- Transaction management
- Reports & analytics
- Export functionality

**Phase 3** (Future):
- Backend integration
- Real-time sync
- Mobile app
- Advanced analytics
