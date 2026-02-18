import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
});

const legalSchema = z.object({
  title: z.string(),
  lastUpdated: z.coerce.date().optional(),
});

const changelogSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  version: z.string().optional(),
});

const tutorialSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  youtubeId: z.string().optional(),
  order: z.number().optional(),
});

// English (default)
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/en/docs' }),
  schema: docSchema,
});
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/en/legal' }),
  schema: legalSchema,
});
const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/en/changelog' }),
  schema: changelogSchema,
});
const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/en/tutorials' }),
  schema: tutorialSchema,
});

// Spanish
const docs_es = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/es/docs' }),
  schema: docSchema,
});
const legal_es = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/es/legal' }),
  schema: legalSchema,
});

// French
const docs_fr = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/fr/docs' }),
  schema: docSchema,
});
const legal_fr = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/fr/legal' }),
  schema: legalSchema,
});

export const collections = {
  docs, legal, changelog, tutorials,
  docs_es, legal_es,
  docs_fr, legal_fr,
};
