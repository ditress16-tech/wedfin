# Integration Guide - Wedding Financial Management

## 🔧 Setup yang Sudah Dilakukan

### 1. Context Providers ✅
File `src/main.jsx` sudah diupdate dengan FinancialProvider:

```jsx
<AuthProvider>
  <VendorProvider>
    <FinancialProvider>  {/* NEW */}
      <CustomizerContextProvider>
        <App />
      </CustomizerContextProvider>
    </FinancialProvider>
  </VendorProvider>
</AuthProvider>
```

### 2. File Baru yang Dibuat ✅

**Context:**
- `src/context/FinancialContext.jsx` - Financial state management

**Views:**
- `src/views/dashboard/vendor/FinancialDashboard.jsx` - Financial overview
- `src/views/dashboard/vendor/ProjectManagement.jsx` - Project management
- `src/views/dashboard/vendor/ClientManagement.jsx` - Client CRM

**Documentation:**
- `WEDDING_FINANCIAL_MANAGEMENT.md` - Dokumentasi lengkap sistem
- `PANDUAN_PENGGUNAAN.md` - Panduan penggunaan dalam Bahasa Indonesia
- `INTEGRATION_GUIDE.md` - Panduan integrasi ini

## 🚀 Langkah Selanjutnya

### 1. Update Router Configuration

Tambahkan routes baru di file router Anda (biasanya `src/routes/Router.js`):

```jsx
// Import komponen baru
import FinancialDashboard from '../views/dashboard/vendor/FinancialDashboard';
import ProjectManagement from '../views/dashboard/vendor/ProjectManagement';
import ClientManagement from '../views/dashboard/vendor/ClientManagement';

// Tambahkan routes
{
  path: '/dashboards/vendor/financial',
  element: <FinancialDashboard />,
  exact: true,
},
{
  path: '/dashboards/vendor/projects',
  element: <ProjectManagement />,
  exact: true,
},
{
  path: '/dashboards/vendor/clients',
  element: <ClientManagement />,
  exact: true,
}
```

### 2. Update Menu/Sidebar

Tambahkan menu items baru di `src/layouts/full/vertical/sidebar/MenuItems.js`:

```jsx
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

### 3. Import Icons yang Dibutuhkan

Pastikan import icons di MenuItems.js:

```jsx
import {
  IconWallet,
  IconBriefcase,
  IconUsers
} from '@tabler/icons-react';
```

## 📝 Checklist Integrasi

### Setup Awal
- [x] FinancialContext dibuat
- [x] FinancialProvider ditambahkan ke main.jsx
- [x] Komponen Financial Dashboard dibuat
- [x] Komponen Project Management dibuat
- [x] Komponen Client Management dibuat

### Yang Perlu Dilakukan
- [ ] Tambahkan routes di Router.js
- [ ] Update MenuItems.js dengan menu baru
- [ ] Test semua halaman baru
- [ ] Verify context providers berfungsi
- [ ] Check responsive design di mobile
- [ ] Test CRUD operations (Add/Edit/Delete)

## 🧪 Testing

### 1. Test Financial Dashboard
```bash
# Jalankan aplikasi
npm run dev

# Buka browser dan navigate ke:
http://localhost:5173/dashboards/vendor/financial
```

**Yang harus dicek:**
- [ ] Stats cards muncul dengan data
- [ ] Bank accounts ditampilkan
- [ ] Debit cards ditampilkan
- [ ] Credit cards dengan progress bar
- [ ] Cash balance muncul
- [ ] Budget tracking berfungsi
- [ ] Financial goals ditampilkan

### 2. Test Project Management
```bash
# Navigate ke:
http://localhost:5173/dashboards/vendor/projects
```

**Yang harus dicek:**
- [ ] Stats cards muncul
- [ ] Project grid ditampilkan
- [ ] Tabs filtering berfungsi
- [ ] Add Project dialog berfungsi
- [ ] Edit Project berfungsi
- [ ] Delete Project berfungsi
- [ ] Progress bars muncul

### 3. Test Client Management
```bash
# Navigate ke:
http://localhost:5173/dashboards/vendor/clients
```

**Yang harus dicek:**
- [ ] Stats cards muncul
- [ ] Client table ditampilkan
- [ ] Tabs filtering berfungsi
- [ ] Add Client dialog berfungsi
- [ ] Edit Client berfungsi
- [ ] Delete Client berfungsi
- [ ] Contact info ditampilkan

## 🔍 Troubleshooting

### Error: Cannot find module 'FinancialContext'
**Solution**: Pastikan import path benar:
```jsx
import { FinancialProvider } from './context/FinancialContext';
```

### Error: useFinancial must be used within FinancialProvider
**Solution**: Pastikan FinancialProvider sudah ditambahkan di main.jsx

### Data tidak muncul
**Solution**: 
1. Check console untuk errors
2. Verify mock data di FinancialContext.jsx
3. Pastikan useEffect berjalan

### Styling tidak sesuai
**Solution**:
1. Check Material-UI theme
2. Verify import statements
3. Check responsive breakpoints

## 🎨 Customization

### Mengubah Mock Data

Edit `src/context/FinancialContext.jsx`:

```jsx
const initializeMockData = () => {
  // Ubah data sesuai kebutuhan
  setAccounts([
    { id: 1, name: 'Your Bank', balance: 100000, ... }
  ]);
  
  // ... dst
};
```

### Menambah Payment Method Baru

1. Tambahkan state di FinancialContext:
```jsx
const [newPaymentMethod, setNewPaymentMethod] = useState([]);
```

2. Tambahkan functions:
```jsx
const addNewPaymentMethod = (data) => {
  // Implementation
};
```

3. Update FinancialDashboard untuk menampilkan

### Mengubah Warna Theme

Edit di komponen:
```jsx
<Box sx={{ bgcolor: 'primary.light' }}>
  // Change 'primary' to 'success', 'warning', 'error', 'info'
</Box>
```

## 🔗 API Integration (Future)

Ketika backend sudah siap, update FinancialContext:

```jsx
// Replace mock data dengan API calls
useEffect(() => {
  const fetchFinancialData = async () => {
    try {
      const response = await fetch('/api/vendor/financial');
      const data = await response.json();
      setAccounts(data.accounts);
      setDebitCards(data.debitCards);
      // ... dst
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchFinancialData();
}, []);
```

## 📚 Additional Resources

- [Material-UI Components](https://mui.com/material-ui/getting-started/)
- [React Context API](https://react.dev/reference/react/useContext)
- [React Router](https://reactrouter.com/)
- [Tabler Icons](https://tabler-icons.io/)

## 🎯 Next Features to Implement

1. **Transaction Management**
   - Add transaction form
   - Transaction history table
   - Transaction categorization
   - Receipt upload

2. **Reports & Analytics**
   - Profit & Loss report
   - Cash flow report
   - Revenue trends chart
   - Expense breakdown chart

3. **Budget Alerts**
   - Email notifications
   - In-app notifications
   - Budget threshold alerts

4. **Export Functionality**
   - Export to Excel
   - Export to PDF
   - Print reports

5. **Advanced Filtering**
   - Date range filters
   - Category filters
   - Status filters
   - Search functionality
