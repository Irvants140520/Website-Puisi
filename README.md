# Chao Ivans — Poetry Site

## Setelah live, cara tambah/hapus puisi:

```
Buka  websitemu.com/admin
Masuk password
Tambah atau hapus puisi langsung di situ ✓
```

## Setup Awal (sekali saja)

### 1. Supabase
1. Daftar supabase.com → buat project
2. SQL Editor → paste isi supabase-setup.sql → Run
3. Settings → API → catat Project URL dan anon key

### 2. GitHub
```bash
pkg install git
cd puisi-site
git init && git add .
git commit -m "first commit"
git remote add origin https://github.com/USERNAME/chao-ivans.git
git branch -M main && git push -u origin main
```

### 3. Netlify
1. netlify.com → Add new site → Import from Git
2. Environment variables → tambah 3 variabel:
   - PUBLIC_SUPABASE_URL
   - PUBLIC_SUPABASE_ANON_KEY
   - ADMIN_PASSWORD  ← password bebas untuk login /admin
3. Deploy → selesai 🎉

Setelah ini kamu tidak perlu buka Supabase/GitHub/Netlify lagi.
Cukup buka websitemu.com/admin untuk kelola puisi.
# Website-Puisi
# Website-Puisi
