import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('writing-en', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'João Marcos',
    description: 'Thinking in public about product and ethics.',
    site: context.site!.toString(),
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.position,
      link: `${import.meta.env.BASE_URL}en/writing/${post.id}`,
    })),
    customData: '<language>en-US</language>',
  });
}
