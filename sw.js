// Guarda o site no aparelho para abrir rápido e funcionar sem internet.
// Ao atualizar o site, aumente o número da versão abaixo.
const VERSAO = 'editora-v4';
const ARQUIVOS = [
  "./",
  "index.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "img/0b0955f448.webp",
  "img/0db2f73b79.webp",
  "img/1a025b7176.webp",
  "img/24b7824092.webp",
  "img/2bca424d1d.webp",
  "img/2bfd20baf7.webp",
  "img/2e917dd09b.webp",
  "img/331285474d.webp",
  "img/36fe050c84.webp",
  "img/3da4d51f01.webp",
  "img/449806e701.webp",
  "img/470a9948ee.webp",
  "img/4d292bc013.webp",
  "img/4fb6f3dfa7.webp",
  "img/5109e3ece0.webp",
  "img/6085ec7c75.webp",
  "img/68fbde4bac.webp",
  "img/6ba905453e.webp",
  "img/6cb8f0e55c.webp",
  "img/73ba9cacb3.webp",
  "img/742b3f3755.webp",
  "img/80124677d7.webp",
  "img/87846e93ee.webp",
  "img/9085433666.webp",
  "img/90d0049e42.webp",
  "img/9219d708cc.webp",
  "img/9466ba47cf.webp",
  "img/9735de8e62.webp",
  "img/9848c6c70d.webp",
  "img/a169e3f7e0.webp",
  "img/aa496d9e95.webp",
  "img/b001b1b19d.webp",
  "img/b65b6d6039.webp",
  "img/ba911b6554.webp",
  "img/badea9f1bc.webp",
  "img/bf94ef5b8f.webp",
  "img/d8f30d3f16.webp",
  "img/f2d5fb9aaa.webp",
  "img/f47c576bbd.webp",
  "img/f4f3db37c8.webp",
  "img/fef04497f3.webp"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Hotmart e fontes vão direto para a internet
  if (req.mode === 'navigate') {
    // Página: tenta a versão mais nova; sem internet, usa a guardada.
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSAO).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
