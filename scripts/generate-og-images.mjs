// Pre-generates src/app/opengraph-image.png and src/app/apple-icon.png.
// Runtime ImageResponse routes break `next build` on Windows with output:'export'
// (@vercel/og "Invalid URL" bug), so the images are baked in as static files.
// Re-run with: node scripts/generate-og-images.mjs
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = join(scriptDir, '..', 'src', 'app');

// @vercel/og's node build does join(import.meta.url, '../asset') which mangles
// file: URLs on Windows. Import a temp copy with absolute asset paths baked in.
async function loadImageResponse() {
  const ogDir = join(scriptDir, '..', 'node_modules', 'next', 'dist', 'compiled', '@vercel', 'og');
  const source = await readFile(join(ogDir, 'index.node.js'), 'utf8');
  const patched = source.replace(
    /fileURLToPath\(join\(import\.meta\.url, "\.\.\/([^"]+)"\)\)/g,
    (_, asset) => JSON.stringify(join(ogDir, asset))
  );
  const tempFile = join(scriptDir, '.og-patched.mjs');
  await writeFile(tempFile, patched);
  try {
    const mod = await import(pathToFileURL(tempFile).href);
    return mod.ImageResponse;
  } finally {
    await unlink(tempFile).catch(() => {});
  }
}

const ImageResponse = await loadImageResponse();

const el = (type, props = {}, children) => ({
  type,
  props: children === undefined ? props : { ...props, children },
});

const crownSvg = (size) =>
  el('svg', { width: size, height: size, viewBox: '0 0 32 32' }, [
    el('path', { d: 'M6 21.4V10.2l5.9 4.6L16 7l4.1 7.8 5.9-4.6v11.2H6Z', fill: '#C9A13B' }),
    el('rect', { x: 6, y: 23.2, width: 20, height: 2.4, rx: 1.2, fill: '#C9A13B' }),
    el('circle', { cx: 16, cy: 17.4, r: 1.5, fill: '#C8102E' }),
  ]);

const ogImage = el(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0C0C10',
      backgroundImage:
        'radial-gradient(ellipse 60% 50% at 80% 0%, rgba(201,161,59,0.25), transparent), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(200,16,46,0.2), transparent)',
    },
  },
  [
    crownSvg(110),
    el(
      'div',
      {
        style: {
          marginTop: 36,
          fontSize: 72,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-2px',
        },
      },
      'Reign Creative LLC'
    ),
    el(
      'div',
      { style: { marginTop: 18, fontSize: 30, color: '#E3CA85' } },
      'Premium Apps. Built to Be Played, Learned From, and Loved.'
    ),
  ]
);

const appleIcon = el(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0C0C10',
    },
  },
  [crownSvg(120)]
);

async function render(element, width, height, outFile) {
  const res = new ImageResponse(element, { width, height });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(appDir, outFile), buf);
  console.log(`wrote src/app/${outFile} (${buf.length} bytes)`);
}

await render(ogImage, 1200, 630, 'opengraph-image.png');
await render(appleIcon, 180, 180, 'apple-icon.png');
