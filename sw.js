---
layout: null
permalink: /sw.js
sitemap: false
---
/* ByOwners.com service worker — network-first for pages, cache-first for static assets */
const CACHE = "bo-{{ site.time | date: '%Y%m%d%H%M' }}";
const CORE = ["{{ '/' | relative_url }}", "{{ '/assets/css/main.css' | relative_url }}", "{{ '/assets/js/main.js' | relative_url }}", "{{ '/assets/js/config.js' | relative_url }}", "{{ '/assets/img/favicon.svg' | relative_url }}"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("{{ '/' | relative_url }}"))));
    return;
  }
  if (/\.(css|js|svg|png|jpg|webp|woff2?)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; })));
  }
});
