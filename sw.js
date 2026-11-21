// Cleanup: removes the PO share helper from phones that installed it, then disappears.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  try { await caches.delete('shared-po'); } catch (err) {}
  await self.registration.unregister();
})()));
