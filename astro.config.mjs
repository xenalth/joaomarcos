// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/** Build a URL → YYYY-MM-DD map from MDX frontmatter dates at config time. */
function buildDateMap() {
  /** @type {Record<string, string>} */
  const map = {};
  const collections = [
    {
      dir: 'src/content/writing-pt',
      /** @param {string} id */
      url: (id) => `https://joaomarcos.pro/escrita/${id}/`,
    },
    {
      dir: 'src/content/writing-en',
      /** @param {string} id */
      url: (id) => `https://joaomarcos.pro/en/writing/${id}/`,
    },
  ];
  for (const { dir, url } of collections) {
    for (const file of readdirSync(join(process.cwd(), dir))) {
      if (!file.endsWith('.mdx')) continue;
      const content = readFileSync(join(process.cwd(), dir, file), 'utf-8');
      const m = content.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
      if (m) map[url(file.replace('.mdx', ''))] = m[1];
    }
  }
  return map;
}

const dateMap = buildDateMap();

export default defineConfig({
  site: 'https://joaomarcos.pro',
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        if (dateMap[item.url]) item.lastmod = dateMap[item.url];
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['496b-2804-14c-62-2ab9-15d9-aa01-b10d-73ae.ngrok-free.app'],
    },
  },
});
