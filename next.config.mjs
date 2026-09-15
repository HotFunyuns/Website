/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export to GitHub Pages. Pages serves files and nothing else: no
  // middleware, no rewrites, no custom headers, and the only redirect it issues
  // is appending a trailing slash to a directory. Two consequences are worth
  // knowing before changing anything here.
  //
  // 1. `trailingSlash: true` is load-bearing, not cosmetic. It makes every page
  //    a directory (`/blog/post/index.html`), which is the form Pages' own
  //    redirect normalises to, so `/blog/post` -> `/blog/post/` is handled by
  //    the host and every canonical can safely end in a slash.
  //
  // 2. `output: 'export'` also writes an RSC flight payload next to every page
  //    (`<route>/index.txt`) and a `404/index.html` beside `404.html`. Pages
  //    serves both at HTTP 200 — the `.txt` as `text/plain` containing the
  //    page's full prose, which can carry no `<link rel="canonical">`, and
  //    `404/` as a soft 404. Neither can be suppressed from this config, so
  //    `scripts/postbuild-normalize-urls.mjs` deletes them after the build.
  //    See docs/url-normalization-audit.md.
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

export default nextConfig;
