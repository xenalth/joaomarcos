import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../lib/og-image';

export async function getStaticPaths() {
  const posts = await getCollection('writing-pt', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const posts = await getCollection('writing-pt', ({ data }) => !data.draft);
  const post = posts.find((p) => p.id === params.slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const png = await generateOgImage({
    title: post.data.title,
    subtitle: post.data.position ?? post.data.subtitle,
    type: post.data.type,
    lang: 'pt',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
