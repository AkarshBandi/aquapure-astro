import type { Template } from 'tinacms';

export const aquaHeroBlockSchema: Template = {
  name: 'aquaHero',
  label: 'Hero — AquaPure',
  fields: [
    { type: 'string', label: 'Eyebrow', name: 'eyebrow' },
    { type: 'string', label: 'Title', name: 'title', required: true },
    { type: 'string', label: 'Description', name: 'description', ui: { component: 'textarea' } },
    { type: 'string', label: 'Primary button', name: 'primaryLabel' },
    { type: 'string', label: 'Primary link', name: 'primaryLink' },
    { type: 'string', label: 'Secondary button', name: 'secondaryLabel' },
    { type: 'string', label: 'Secondary link', name: 'secondaryLink' },
    { name: 'background', label: 'Background image', type: 'string' },
  ],
  ui: {
    defaultItem: {
      eyebrow: 'Whole-home water treatment',
      title: 'Clean water for the whole home',
      description: 'We are a family-owned Scottsdale company engineering custom filtration for Arizona’s hard water. Protect your family and your pipes.',
      primaryLabel: 'Free consultation',
      primaryLink: '#test',
      secondaryLabel: 'See rates',
      secondaryLink: '#rates',
    },
  },
};
