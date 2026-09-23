import type { Template } from 'tinacms';

export const knowWaterBlockSchema: Template = {
  name: 'knowWater',
  label: 'Know your water',
  fields: [
    { type: 'string', label: 'Eyebrow', name: 'eyebrow' },
    { type: 'string', label: 'Heading', name: 'heading' },
    { type: 'string', label: 'Paragraph', name: 'paragraph', ui: { component: 'textarea' } },
    {
      type: 'object',
      label: 'Sub-features',
      name: 'subFeatures',
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title ?? 'Feature' }) },
      fields: [
        { type: 'string', label: 'Title', name: 'title' },
        { type: 'string', label: 'Text', name: 'text', ui: { component: 'textarea' } },
      ],
    },
    { name: 'featureImage', label: 'Image', type: 'image' },
    { type: 'string', label: 'Learn label', name: 'learnLabel' },
    { type: 'string', label: 'Learn link', name: 'learnLink' },
    { type: 'string', label: 'More label', name: 'moreLabel' },
    { type: 'string', label: 'More link', name: 'moreLink' },
  ],
  ui: {
    defaultItem: {
      eyebrow: 'Why it matters',
      heading: 'Know your water',
      paragraph: 'Hard water scales your pipes and cuts your water heater life in half. Chlorine dries your skin and you breathe it in during hot showers.',
      subFeatures: [
        { title: 'Calcium & magnesium', text: 'Destroys appliances from the inside and leaves chalky residue on fixtures.' },
        { title: 'Municipal chlorine', text: 'Strips natural oils from skin and degrades indoor air quality.' },
      ],
      learnLabel: 'Learn how it works',
      moreLabel: 'More',
    },
  },
};
