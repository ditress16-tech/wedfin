# Refactoring Notes - Vendor Dashboard

## Tujuan Refactoring
Merapikan dan mengurangi duplikasi kode pada vendor dashboard dengan membuat komponen reusable dan utility functions.

## Komponen Baru yang Dibuat

### 1. **StatCard** (`src/components/vendor/StatCard.jsx`)
Komponen reusable untuk menampilkan kartu statistik dengan:
- Icon
- Value
- Change percentage
- Trend indicator (up/down)

**Digunakan di:**
- VendorDashboard.jsx
- InvoicesBilling.jsx

### 2. **KPICard** (`src/components/vendor/KPICard.jsx`)
Komponen khusus untuk KPI dengan progress bar:
- Icon dengan background color
- Value dan title
- Progress bar dengan target
- Trend indicator

**Digunakan di:**
- KPIReports.jsx

### 3. **ProjectCard** (`src/components/vendor/ProjectCard.jsx`)
Komponen untuk menampilkan project card dengan:
- Project name dan client
- Date dan budget
- Status chip
- Progress bar

**Digunakan di:**
- VendorDashboard.jsx

### 4. **FormDialog** (`src/components/vendor/FormDialog.jsx`)
Komponen wrapper untuk dialog form yang konsisten:
- Title
- Content area (children)
- Cancel dan Save buttons
- Disabled state handling

**Digunakan di:**
- ServicePackages.jsx

## Utility Functions

### **formatters.js** (`src/utils/formatters.js`)
Berisi fungsi-fungsi formatting yang sering digunakan:

- `formatCurrency(amount)` - Format angka ke currency USD
- `formatDate(dateString)` - Format tanggal ke format readable
- `formatPercentage(value)` - Format percentage dengan tanda +/-
- `getStatusColor(status)` - Return color berdasarkan status
- `getPriorityColor(priority)` - Return color berdasarkan priority
- `getCategoryColor(category)` - Return color berdasarkan category

**Digunakan di:**
- InvoicesBilling.jsx
- ServicePackages.jsx
- ProjectCard.jsx
- Dan file lainnya

## Custom Hooks

### **useFormDialog** (`src/hooks/useFormDialog.js`)
Hook untuk mengelola state dialog form:
- `open` - State dialog open/close
- `editing` - Item yang sedang diedit
- `formData` - Data form
- `handleOpen(item)` - Buka dialog dengan/tanpa data
- `handleClose()` - Tutup dialog
- `handleChange(e)` - Handle perubahan form

**Digunakan di:**
- ServicePackages.jsx

## Perubahan pada File Existing

### VendorDashboard.jsx
- ✅ Menggunakan `StatCard` untuk stats cards
- ✅ Menggunakan `ProjectCard` untuk project list
- ✅ Menghapus duplikasi kode rendering

### InvoicesBilling.jsx
- ✅ Import `formatCurrency`, `formatDate`, `getStatusColor` dari utils
- ✅ Menghapus fungsi formatting lokal
- ✅ Menghapus import yang tidak digunakan

### KPIReports.jsx
- ✅ Menggunakan `KPICard` untuk KPI cards
- ✅ Import utility functions
- ✅ Mengurangi kompleksitas rendering

### ServicePackages.jsx
- ✅ Menggunakan `FormDialog` untuk dialog
- ✅ Menggunakan `useFormDialog` hook
- ✅ Import `getStatusColor` dari utils
- ✅ Menghapus duplikasi kode dialog

### UserProfile.jsx
- ✅ Menghapus import React yang tidak digunakan
- ✅ Memperbaiki deprecated props (primaryTypographyProps)

## Manfaat Refactoring

1. **Kode Lebih Rapi**: Komponen lebih kecil dan fokus
2. **Reusability**: Komponen dapat digunakan di berbagai tempat
3. **Maintainability**: Lebih mudah untuk maintain dan update
4. **Consistency**: UI lebih konsisten karena menggunakan komponen yang sama
5. **Reduced Duplication**: Mengurangi duplikasi kode secara signifikan
6. **Better Organization**: Struktur folder lebih terorganisir

## Struktur Folder Baru

```
src/
├── components/
│   └── vendor/
│       ├── StatCard.jsx
│       ├── KPICard.jsx
│       ├── ProjectCard.jsx
│       └── FormDialog.jsx
├── hooks/
│   └── useFormDialog.js
└── utils/
    └── formatters.js
```

## Next Steps (Opsional)

1. Refactor file lain yang masih panjang (TasksTimeline, TeamManagement, dll)
2. Buat komponen untuk table rows yang repetitive
3. Buat custom hooks untuk data fetching
4. Tambahkan PropTypes atau TypeScript untuk type safety
5. Buat storybook untuk komponen reusable
