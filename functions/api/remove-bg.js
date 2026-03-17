/**
 * Cloudflare Pages Function: /api/remove-bg
 * Proxies requests to remove.bg API, keeping the API key server-side.
 *
 * Environment variable required:
 *   REMOVE_BG_API_KEY — your remove.bg API key
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey = env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Server misconfiguration: missing API key' }, { status: 500 });
  }

  // Forward the multipart form data to remove.bg
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const imageFile = formData.get('image_file');
  if (!imageFile) {
    return Response.json({ error: 'Missing image_file field' }, { status: 400 });
  }

  // Build new FormData for remove.bg
  const outForm = new FormData();
  outForm.append('image_file', imageFile);
  outForm.append('size', 'auto');

  let upstream;
  try {
    upstream = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: outForm,
    });
  } catch (err) {
    return Response.json({ error: `Network error: ${err.message}` }, { status: 502 });
  }

  if (!upstream.ok) {
    // Try to parse remove.bg error message
    let msg = `remove.bg error (${upstream.status})`;
    try {
      const body = await upstream.json();
      const errs = body?.errors;
      if (errs?.length) msg = errs.map(e => e.title).join('; ');
    } catch { /* ignore */ }
    return Response.json({ error: msg }, { status: upstream.status });
  }

  // Stream the PNG back to the client
  const imgBuffer = await upstream.arrayBuffer();
  return new Response(imgBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store',
    },
  });
}
