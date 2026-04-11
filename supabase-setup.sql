-- ═══════════════════════════════════════════════════
-- SETUP SUPABASE — Chao Ivans Poetry Site
-- Jalankan script ini di: Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════════

-- 1. Buat tabel puisi
CREATE TABLE IF NOT EXISTS puisi (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug       TEXT NOT NULL UNIQUE,
  judul      TEXT NOT NULL,
  tanggal    DATE NOT NULL DEFAULT CURRENT_DATE,
  pengantar  TEXT,
  isi        TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Izinkan siapa saja membaca (website publik)
ALTER TABLE puisi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read poems"
  ON puisi FOR SELECT
  USING (true);

-- 3. Contoh data awal (opsional, boleh dihapus)
INSERT INTO puisi (slug, judul, tanggal, pengantar, isi) VALUES
(
  'hujan-di-bulan-juni',
  'Hujan di Bulan Juni',
  '2024-06-12',
  'Tentang rindu yang datang bersama hujan.',
  'Hujan turun perlahan
seperti kata-kata yang tak sempat terucap —
membasahi tanah yang lama kering,
meresap ke celah-celah yang tak pernah terbuka.

Aku berdiri di ambang pintu,
mencium bau tanah yang bangkit,
mendengar bunyi rintik
yang berbicara dalam bahasa purba.

Di bulan Juni ini
hujan tidak hanya membasahi bumi —
ia membasahi ruang di dadaku
yang selama ini kututup rapat.'
),
(
  'sepi-yang-akrab',
  'Sepi yang Akrab',
  '2024-11-05',
  'Ketika kesepian menjadi teman lama.',
  'Sepi ini sudah lama bersamaku —
lebih lama dari teman mana pun,
lebih setia dari janji mana pun.

Aku tidak lagi takut padanya.
Kami sudah saling mengenal —
ia tahu kapan harus diam,
aku tahu kapan harus membiarkannya bicara.

Sepi bukan kekosongan.
Ia adalah ruang
tempat aku paling utuh.'
);

-- ═══════════════════════════════════════════════════
-- CARA TAMBAH PUISI BARU:
--
-- Cukup pergi ke:
--   Supabase Dashboard → Table Editor → puisi → Insert row
--
-- Isi kolom:
--   slug      → nama-puisi-pakai-tanda-hubung (unik, tanpa spasi)
--   judul     → Judul Puisi
--   tanggal   → 2025-01-15
--   pengantar → Satu kalimat tentang puisi (boleh kosong)
--   isi       → Teks puisi (baris kosong = bait baru)
-- ═══════════════════════════════════════════════════
