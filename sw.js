const CACHE = "diario-corporeo-v4";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Rete-first per la pagina, cosÃ¬ gli aggiornamenti arrivano subito; fallback alla cache offline.
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/")) {
    e.respondWith(fetch(req).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(req, copy).catch(() => {}));
      return r;
    }).catch(() => caches.match(req).then((m) => m || caches.match("./index.html"))));
    return;
  }
  // Cache-first per gli asset statici locali.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then((m) => m || fetch(req).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(req, copy).catch(() => {}));
      return r;
    }).catch(() => m)));
  }
});
