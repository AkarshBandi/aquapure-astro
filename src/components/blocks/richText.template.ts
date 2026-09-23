import type { Template } from 'tinacms';

export const richTextBlockSchema: Template = {
  name: 'richText',
  label: 'Rich text',
  fields: [
    { type: 'string', label: 'Eyebrow', name: 'eyebrow' },
    { type: 'string', label: 'Headline', name: 'headline' },
    { type: 'rich-text', label: 'Body', name: 'body' },
  ],
  ui: {
    defaultItem: {
      eyebrow: 'Section label',
      headline: 'Rich text headline',
      body: 'Body content with **markdown** support.',
    },
  },
};
