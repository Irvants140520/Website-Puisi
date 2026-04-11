export const prerender = false;

export async function POST({ request, cookies }) {
  const form     = await request.formData();
  const password = form.get('password')?.toString() ?? '';
  const correct  = import.meta.env.ADMIN_PASSWORD;

  if (!correct) {
    return new Response('ADMIN_PASSWORD env var belum diset.', { status: 500 });
  }

  if (password !== correct) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/admin?error=1' },
    });
  }

  // Set session cookie (HttpOnly, 7 hari)
  cookies.set('admin_session', 'ok', {
    path:     '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge:   60 * 60 * 24 * 7,
    secure:   true,
  });

  return new Response(null, {
    status: 303,
    headers: { Location: '/admin' },
  });
}
