# Panduan Penggunaan - Wedding Financial Management System

## 🚀 Quick Start

### 1. Instalasi
```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di http://localhost:5173

### 2. Login
Gunakan kredensial vendor sesuai kategori:
- **Photography**: vendor_photography / password
- **Makeup**: vendor_makeup / password
- **Catering**: vendor_catering / password
- **Venue**: vendor_venue / password

## 📊 Fitur-Fitur Utama

### 1. Financial Dashboard
**Lokasi**: `/vendor/financial`

**Fitur**:
- Lihat total balance dari semua akun
- Monitor net worth (balance - hutang)
- Track revenue dan profit bulanan
- Kelola multiple payment methods:
  - Bank accounts
  - Debit cards
  - Credit cards
  - Cash on hand
  - Digital wallets (PayPal, Stripe)
- Budget tracking per kategori
- Financial goals dengan progress

**Cara Menggunakan**:
1. Buka Financial Dashboard dari menu
2. Lihat overview keuangan di bagian atas
3. Scroll ke bawah untuk melihat detail akun
4. Monitor budget dan goals di bagian bawah

### 2. Project Management
**Lokasi**: `/vendor/projects`

**Fitur**:
- Manajemen proyek wedding
- Budget tracking per project
- Task management
- Progress monitoring
- Status tracking (planning, active, completed)

**Cara Menggunakan**:
1. Klik "Add Project" untuk tambah proyek baru
2. Isi detail proyek:
   - Nama proyek
   - Nama klien
   - Tanggal wedding
   - Budget
   - Kategori
   - Status
   - Priority
3. Gunakan tabs untuk filter proyek berdasarkan status
4. Edit atau hapus proyek dengan tombol di kartu proyek

### 3. Client Management
**Lokasi**: `/vendor/clients`

**Fitur**:
- Database klien lengkap
- Lead tracking
- Client ratings
- Revenue per client
- Communication history

**Cara Menggunakan**:
1. Klik "Add Client" untuk tambah klien baru
2. Isi informasi klien:
   - Nama
   - Email & Phone
   - Wedding date
   - Budget
   - Status (lead/active/completed)
3. Gunakan tabs untuk filter klien
4. Edit atau hapus klien dari tabel

### 4. Vendor Dashboard
**Lokasi**: `/vendor/dashboard`

**Fitur**:
- Overview bisnis vendor
- KPI metrics
- Recent projects
- Upcoming deadlines
- Quick stats

**Cara Menggunakan**:
- Dashboard otomatis menampilkan data terbaru
- Lihat stats cards untuk metrics penting
- Check recent projects di bagian tengah
- Monitor upcoming deadlines di sidebar

### 5. Invoices & Billing
**Lokasi**: `/vendor/invoices`

**Fitur**:
- Create invoices
- Track payments
- Send invoices to clients
- Download PDF
- Monitor overdue payments

**Cara Menggunakan**:
1. Klik "Create Invoice" untuk buat invoice baru
2. Pilih klien dan project
3. Set amount dan due date
4. Send invoice ke klien via email
5. Track payment status
6. Download PDF untuk records

## 💡 Tips & Best Practices

### Financial Management
1. **Update Balance Regularly**: Pastikan balance di semua akun selalu up-to-date
2. **Categorize Expenses**: Gunakan kategori yang konsisten untuk expense tracking
3. **Set Realistic Budgets**: Set budget berdasarkan historical data
4. **Monitor Credit Cards**: Perhatikan credit utilization dan due dates
5. **Track Cash Transactions**: Jangan lupa record transaksi cash

### Project Management
1. **Update Progress**: Update progress proyek secara berkala
2. **Set Clear Deadlines**: Tentukan deadline yang realistis
3. **Prioritize Tasks**: Gunakan priority levels dengan bijak
4. **Document Everything**: Tambahkan notes untuk setiap proyek
5. **Monitor Budget**: Check budget vs actual secara rutin

### Client Management
1. **Complete Information**: Isi data klien selengkap mungkin
2. **Follow Up Leads**: Jangan biarkan leads terlalu lama tanpa follow up
3. **Request Ratings**: Minta rating dari klien setelah project selesai
4. **Track Communication**: Log semua komunikasi penting
5. **Build Relationships**: Maintain good relationship untuk referrals

## 🔧 Troubleshooting

### Data Tidak Muncul
- Pastikan sudah login dengan benar
- Check console browser untuk error
- Refresh halaman
- Clear browser cache

### Balance Tidak Akurat
- Verify semua transactions sudah diinput
- Check untuk duplicate entries
- Reconcile dengan bank statements

### Performance Issues
- Clear browser cache
- Close unused tabs
- Check internet connection
- Restart browser

## 📱 Mobile Usage

Aplikasi ini responsive dan bisa digunakan di mobile:
- Semua fitur tersedia di mobile
- Touch-friendly interface
- Optimized untuk tablet dan smartphone

## 🔐 Security Tips

1. **Logout Setelah Selesai**: Selalu logout setelah menggunakan aplikasi
2. **Strong Password**: Gunakan password yang kuat
3. **Regular Backups**: Backup data secara berkala
4. **Secure Connection**: Gunakan HTTPS dan koneksi aman
5. **Limited Access**: Jangan share credentials dengan orang lain

## 📞 Support

Jika mengalami masalah atau butuh bantuan:
1. Check dokumentasi lengkap di WEDDING_FINANCIAL_MANAGEMENT.md
2. Lihat MULTI_VENDOR_DASHBOARD_FLOW.md untuk flow detail
3. Contact support team
4. Create issue di repository

## 🎯 Roadmap

### Coming Soon
- [ ] Transaction management
- [ ] Advanced reports & analytics
- [ ] Banking integration
- [ ] Multi-currency support
- [ ] Mobile app
- [ ] Email notifications
- [ ] Automated reminders
- [ ] Export to Excel/PDF
- [ ] Calendar integration
- [ ] Team collaboration features

## 📚 Resources

- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
