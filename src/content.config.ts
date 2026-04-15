import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writingSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.coerce.date(),
  /** Date of last significant edit — used in dateModified JSON-LD, article:modified_time and sitemap lastmod. */
  updatedDate: z.coerce.date().optional(),
  /** One-sentence thesis — rendered before the body. Forces the writer to have an argument. */
  position: z.string().optional(),
  type: z.enum(['essay', 'case']),
  /** Language the piece was originally written in. */
  originalLang: z.enum(['pt', 'en']).optional(),
  draft: z.boolean().default(false),
});

const notesSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),
});

export const collections = {
  'writing-pt': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/writing-pt' }),
    schema: writingSchema,
  }),
  'writing-en': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/writing-en' }),
    schema: writingSchema,
  }),
  'notes-pt': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/notes-pt' }),
    schema: notesSchema,
  }),
  'notes-en': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/notes-en' }),
    schema: notesSchema,
  }),
};
