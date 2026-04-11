export const prerender = false;

import { supabase } from '../../lib/supabase.js';

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

export async function POST({ request, cookies }) {
  // Auth check
  if (cookies.get('admin_session')?.value !== 'ok') {
    return new Response(null, { status: 303, headers: { Location: '/admin' } });
  }

  const form      = await request.formData();
  const judul     = form.get('judul')?.toString().trim() ?? '';
  const tanggal   = form.get('tanggal')?.toString().trim() ?? '';
  const pengantar = form.get('pengantar')?.toString().trim() || null;
  const isi       = form.get('isi')?.toString().trim() ?? '';

  if (!judul || !tanggal || !isi) {
    return new Response(null, { status: 303, headers: { Location: '/admin?err=empty' } });
  }

  // Generate unique slug
  const baseSlug = slugify(judul) || 'puisi';
  let slug = baseSlug;
  let i = 1;
  while (true) {
    const { data } = await supabase.from('puisi').select('id').eq('slug', slug).maybeSingle();
    if (!data) break;
    slug = `${baseSlug}-${i++}`;
  }

  const { error } = await supabase
    .from('puisi')
    .insert({ slug, judul, tanggal, pengantar, isi });

  if (error) {
    console.error('Insert error:', error.message);
    return new Response(null, { status: 303, headers: { Location: '/admin?err=db' } });
  }

  return new Response(null, { status: 303, headers: { Location: '/admin?ok=tambah' } });
}
