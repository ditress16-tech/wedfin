# Menu Update Instructions

## Tambahkan Menu Items Baru

Untuk setiap vendor menu (photographyMenuItems, makeupMenuItems, cateringMenuItems, venueMenuItems, plannerMenuItems), tambahkan menu items berikut:

### 1. Update Financial Section

Ganti section Financial yang ada dengan:

```javascript
{
  navlabel: true,
  subheader: 'Financial',
},
{
  id: uniqueId(),
  title: 'Financial Dashboard',
  icon: IconWallet,
  href: '/dashboards/vendor/financial',
},
{
  id: uniqueId(),
  title: 'Financial Management',
  icon: IconCurrencyDollar,
  href: '/dashboards/vendor/financial-management',
},
{
  id: uniqueId(),
  title: 'Invoices & Billing',
  icon: IconFileInvoice,
  href: '/dashboards/vendor/invoices-billing',
},
{
  id: uniqueId(),
  title: 'Service Packages',
  icon: IconPackage,
  href: '/dashboards/vendor/service-packages',
},
{
  id: uniqueId(),
  title: 'KPI & Reports',
  icon: IconReportAnalytics,
  href: '/dashboards/vendor/kpi-reports',
},
```

### 2. Tambahkan Section Baru: Projects & Clients

Setelah Financial section, sebelum Communication section, tambahkan:

```javascript
{
  navlabel: true,
  subheader: 'Projects & Clients',
},
{
  id: uniqueId(),
  title: 'Project Management',
  icon: IconFolders,
  href: '/dashboards/vendor/projects',
},
{
  id: uniqueId(),
  title: 'Client Management',
  icon: IconUserCheck,
  href: '/dashboards/vendor/clients',
},
```

## Icons yang Sudah Ditambahkan

Icons berikut sudah ditambahkan di import statement:
- `IconWallet` - untuk Financial Dashboard
- `IconFolders` - untuk Project Management
- `IconUserCheck` - untuk Client Management

## Hasil Akhir Menu Structure

```
Dashboard
├── Dashboard
├── Analytics
├── Statistics

Project Management
├── Wedding Management
├── Wedding Projects
├── Vendor Management
├── Clients & Leads
├── Calendar & Booking
├── Tasks & Timeline

Financial
├── Financial Dashboard (NEW)
├── Financial Management
├── Invoices & Billing
├── Service Packages
├── KPI & Reports

Projects & Clients (NEW SECTION)
├── Project Management (NEW)
├── Client Management (NEW)

Communication
├── Messages & Chat
├── Email Center
├── Notes

Team & Settings
├── Team Management
├── User Profile
├── Account Settings
```

## Testing

Setelah update, test menu items:
1. Check semua menu muncul
2. Click setiap menu item
3. Verify routing berfungsi
4. Check icons muncul dengan benar
