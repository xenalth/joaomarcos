import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('writing-pt', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'João Marcos',
    description: 'Pensamento em público sobre produto e ética.',
    site: context.site!.toString(),
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `${import.meta.env.BASE_URL}escrita/${post.id}`,
    })),
    customData: '<language>pt-BR</language>',
  });
}
