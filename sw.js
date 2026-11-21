// Receives a PO shared from WhatsApp ("Share" -> Hanuman Bills) and hands it to the page.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const form = await e.request.formData();
        const f = form.getAll('po').find(x => x && x.size);
        if (f) {
          const c = await caches.open('shared-po');
          await c.put('po', new Response(f, {headers: {'Content-Type': f.type || 'application/pdf', 'x-name': encodeURIComponent(f.name || 'po')}}));
        }
      } catch (err) {}
      return Response.redirect('./?shared=1', 303);
    })());
  }
});
