import type { Collection } from 'tinacms';

export const BlogCollection: Collection = {
  name: 'blog',
  label: 'Blog',
  path: 'src/content/blog',
  format: 'mdx',
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
  },
  fields: [
    { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
    { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
    { name: 'pubDate', label: 'Publication date', type: 'datetime' },
    { name: 'heroImage', label: 'Hero image', type: 'image' },
    { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
  ],
};
