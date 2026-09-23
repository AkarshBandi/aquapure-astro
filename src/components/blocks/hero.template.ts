import type { Template } from 'tinacms';

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  fields: [
    { type: 'string', label: 'Eyebrow', name: 'eyebrow' },
    { type: 'string', label: 'Headline', name: 'headline' },
    { type: 'string', label: 'Tagline', name: 'tagline', ui: { component: 'textarea' } },
    {
      type: 'object',
      label: 'Primary action',
      name: 'primaryAction',
      fields: [
        { type: 'string', label: 'Label', name: 'label' },
        { type: 'string', label: 'Link', name: 'link' },
      ],
    },
    {
      type: 'object',
      label: 'Secondary action',
      name: 'secondaryAction',
      fields: [
        { type: 'string', label: 'Label', name: 'label' },
        { type: 'string', label: 'Link', name: 'link' },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        { name: 'src', label: 'Image source', type: 'image' },
        { name: 'alt', label: 'Alt text', type: 'string' },
      ],
    },
  ],
  ui: {
    defaultItem: {
      eyebrow: 'Welcome',
      headline: 'Headline goes here',
      tagline: 'Tagline that explains the value prop in one sentence.',
      primaryAction: { label: 'Get started', link: '/' },
    },
  },
};
