// Minimal production static file server for the built SPA (dist/).
// Zero dependencies on purpose: `vite preview` is explicitly not meant for
// production (see Vite's own docs), and this app has no server-side rendering
// to justify a framework like Express — just static files plus SPA fallback
// so client-side routes (e.g. /projects/some-slug) survive a hard refresh.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, 'dist');
const INDEX_HTML = join(DIST_DIR, 'index.html');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.map': 'application/json; charset=utf-8',
};

function cacheControlFor(pathname, ext) {
  if (pathname.startsWith('/assets/')) return 'public, max-age=31536000, immutable'; // Vite content-hashes these
  if (ext === '.html') return 'no-cache'; // must always revalidate so new asset hashes get picked up
  return 'public, max-age=3600';
}

async function readIndexHtml() {
  return readFile(INDEX_HTML);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const pathname = decodeURIComponent(url.pathname);

    // Resolve against DIST_DIR and verify the result never escapes it (blocks `..` traversal).
    const resolved = normalize(join(DIST_DIR, pathname));
    if (resolved !== DIST_DIR && !resolved.startsWith(DIST_DIR + sep)) {
      res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' }).end('Bad request');
      return;
    }

    let filePath = pathname === '/' ? INDEX_HTML : resolved;
    let fileStat = await stat(filePath).catch(() => null);

    if (fileStat?.isDirectory()) {
      filePath = join(filePath, 'index.html');
      fileStat = await stat(filePath).catch(() => null);
    }

    if (!fileStat) {
      // No literal file at this path. If it looks like a client-side route
      // (no extension), hand it index.html so React Router owns it.
      // Anything with an extension (a missing asset) is a genuine 404.
      if (!extname(pathname)) {
        const html = await readIndexHtml();
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' });
        res.end(html);
        return;
      }
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }

    const ext = extname(filePath);
    const body = await readFile(filePath);
    res.writeHead(200, {
      'content-type': MIME_TYPES[ext] ?? 'application/octet-stream',
      'cache-control': cacheControlFor(pathname, ext),
    });
    res.end(body);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' }).end('Internal server error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Questfolio listening on http://${HOST}:${PORT}`);
});

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
