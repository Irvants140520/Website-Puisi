import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey  = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Types ──────────────────────────────────────────────
/** @typedef {{ id: number, slug: string, judul: string, tanggal: string, pengantar: string|null, isi: string, created_at: string }} Puisi */

/**
 * Ambil semua puisi, diurutkan dari terbaru
 * @returns {Promise<Puisi[]>}
 */
export async function getAllPuisi() {
  const { data, error } = await supabase
    .from('puisi')
    .select('*')
    .order('tanggal', { ascending: false });

  if (error) { console.error('Supabase error:', error.message); return []; }
  return data ?? [];
}

/**
 * Ambil satu puisi berdasarkan slug
 * @param {string} slug
 * @returns {Promise<Puisi|null>}
 */
export async function getPuisiBySlug(slug) {
  const { data, error } = await supabase
    .from('puisi')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function tambahView(slug) {
  await supabase.rpc('increment_views', { puisi_slug: slug });
}