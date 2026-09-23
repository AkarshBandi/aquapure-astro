import type { Template } from 'tinacms';

export const ctaBlockSchema: Template = {
  name: 'cta',
  label: 'Call to action',
  fields: [
    { type: 'string', label: 'Headline', name: 'headline' },
    { type: 'string', label: 'Text', name: 'text', ui: { component: 'textarea' } },
    { type: 'string', label: 'Primary label', name: 'primaryLabel' },
    { type: 'string', label: 'Primary link', name: 'primaryLink' },
    { type: 'string', label: 'Secondary label', name: 'secondaryLabel' },
    { type: 'string', label: 'Secondary link', name: 'secondaryLink' },
  ],
  ui: {
    defaultItem: {
      headline: 'Ready to get started?',
      text: 'A short, persuasive line that drives action.',
      primaryLabel: 'Primary action',
      primaryLink: '/',
    },
  },
};
