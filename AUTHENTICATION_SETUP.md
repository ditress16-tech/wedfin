# Wedding Photography Dashboard - Authentication Setup

## Perubahan yang Telah Dibuat

### 1. Landing Page (Halaman Utama Sebelum Login)
- **File**: `src/ui/frontend-pages/LandingPage.jsx`
- **Route**: `/` (root)
- Menggunakan komponen-komponen profesional yang sudah ada:
  - **HpHeader** - Header dengan navigasi dan tombol login
  - **Banner** - Hero section dengan judul besar dan CTA
  - **Features** - Showcase fitur-fitur utama dashboard
  - **ExceptionalFeature** - Animated feature showcase
  - **PowerfulDozens** - Carousel fitur tambahan
  - **Reviews** - Testimoni dari wedding vendors
  - **Pricing** - Informasi pricing dan trust badges
  - **FAQ** - Frequently Asked Questions
  - **C2a** - Call-to-action section
  - **Footer** - Footer dengan links dan social media
  - **ScrollToTop** - Tombol scroll to top

### 2. Halaman Login
- **File**: `src/views/authentication/Login.jsx`
- **Route**: `/auth/login`
- Fitur:
  - Dropdown untuk memilih tipe user (Wedding Planner, Photography Vendor, Makeup Artist, Catering Service, Wedding Venue)
  - Email dan password fields
  - Auto-fill email berdasarkan tipe user yang dipilih
  - Redirect otomatis ke dashboard sesuai tipe user setelah login
  - Tombol "Back to Home" untuk kembali ke landing page

### 3. Protected Routes
- **File**: `src/layouts/full/FullLayout.jsx`
- Semua route dashboard sekarang dilindungi dengan autentikasi
- User yang belum login akan diarahkan ke halaman login
- User yang sudah login akan tetap login (data disimpan di localStorage)

### 4. Logout Functionality
- **File**: `src/layouts/full/vertical/header/Profile.jsx`
- Tombol logout di profile dropdown
- Menampilkan informasi user yang sedang login (nama, role, email)
- Logout akan menghapus session dan redirect ke halaman login

### 5. Router Configuration
- **File**: `src/routes/Router.jsx`
- Route structure:
  - `/` - Landing Page (public)
  - `/auth/login` - Login Page (public)
  - `/dashboards/*` - Dashboard Routes (protected)

### 6. Customized Components for Wedding Theme
Komponen-komponen berikut telah disesuaikan dengan tema wedding photography:

- **FeatureTitle.js** - Judul fitur disesuaikan untuk wedding business
- **ExceptionalFeature/index.js** - Feature slides disesuaikan (Portfolio Gallery, Booking System, Client Management, dll)
- **Reviews/ContentArea.js** - Konten review disesuaikan untuk wedding vendors
- **C2a/index.js** - Call-to-action disesuaikan untuk wedding photography business
- **Pricing/index.js** - Trust badge disesuaikan untuk wedding vendors

## Cara Menggunakan

### Login
1. Buka aplikasi di browser
2. Anda akan melihat landing page wedding photography yang lengkap dengan:
   - Hero banner dengan animasi
   - Feature showcase
   - Testimonials
   - Pricing information
   - FAQ section
3. Klik tombol "Log In" di header atau "Login to Dashboard" di banner
4. Pilih tipe user dari dropdown
5. Email akan otomatis terisi sesuai tipe user
6. Masukkan password apa saja (demo mode)
7. Klik "Login"

### User Types & Credentials
- **Wedding Planner**: planner@wedding.com
- **Photography Vendor**: photo@vendor.com
- **Makeup Artist**: makeup@vendor.com
- **Catering Service**: catering@vendor.com
- **Wedding Venue**: venue@vendor.com

### Logout
1. Klik avatar profile di header (kanan atas)
2. Klik tombol "Logout"
3. Anda akan diarahkan kembali ke halaman login

## File yang Dimodifikasi

1. `src/routes/Router.jsx` - Update routing structure
2. `src/context/AuthContext.jsx` - Remove auto-login, use localStorage
3. `src/layouts/full/FullLayout.jsx` - Add route protection
4. `src/layouts/full/vertical/header/Profile.jsx` - Add logout & user info
5. `src/ui/frontend-pages/LandingPage.jsx` - Complete landing page with all sections
6. `src/ui/frontend-pages/homepage/features/FeatureTitle.js` - Wedding theme customization
7. `src/ui/frontend-pages/homepage/exceptional-feature/index.js` - Wedding features
8. `src/ui/frontend-pages/shared/reviews/ContentArea.js` - Wedding vendor reviews
9. `src/ui/frontend-pages/shared/c2a/index.js` - Wedding CTA
10. `src/ui/frontend-pages/shared/pricing/index.js` - Wedding trust badges

## File Baru

1. `src/views/authentication/Login.jsx` - Login page component

## Komponen Landing Page yang Digunakan

### Dari `src/ui/frontend-pages/`:
- **homepage/banner/** - Hero section dengan animasi
- **homepage/features/** - Feature cards showcase
- **homepage/exceptional-feature/** - Animated feature carousel
- **homepage/powerful-dozens/** - Additional features carousel
- **homepage/faq/** - FAQ accordion
- **shared/header/** - Navigation header
- **shared/footer/** - Footer dengan links
- **shared/reviews/** - Customer testimonials
- **shared/pricing/** - Pricing cards
- **shared/c2a/** - Call-to-action section
- **shared/scroll-to-top/** - Scroll to top button

## Testing

Jalankan aplikasi dengan:
```bash
npm run dev
```

Kemudian buka browser dan akses `http://localhost:5173`

Anda akan melihat landing page yang lengkap dengan semua section yang profesional dan disesuaikan untuk wedding photography business.

