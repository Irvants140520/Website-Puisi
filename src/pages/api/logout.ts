export const prerender = false;

export async function POST({ cookies }) {
  cookies.delete('admin_session', { path: '/' });
  return new Response(null, {
    status: 303,
    headers: { Location: '/admin' },
  });
}
