export const prerender = false;

import { supabase } from '../../lib/supabase.js';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_session')?.value !== 'ok') {
    return new Response(null, { status: 303, headers: { Location: '/admin' } });
  }

  const form = await request.formData();
  const id   = form.get('id')?.toString();

  if (!id) {
    return new Response(null, { status: 303, headers: { Location: '/admin?err=noid' } });
  }

  const { error } = await supabase.from('puisi').delete().eq('id', id);

  if (error) {
    return new Response(null, { status: 303, headers: { Location: '/admin?err=db' } });
  }

  return new Response(null, { status: 303, headers: { Location: '/admin?ok=hapus' } });
}
