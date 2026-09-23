import type { Template } from 'tinacms';

export const whyWaterBlockSchema: Template = {
  name: 'whyWater',
  label: 'Why AquaPure',
  fields: [
    { type: 'string', label: 'Eyebrow', name: 'eyebrow' },
    { type: 'string', label: 'Heading', name: 'heading' },
    { type: 'string', label: 'Paragraph', name: 'paragraph', ui: { component: 'textarea' } },
    {
      type: 'object',
      label: 'Stats',
      name: 'stats',
      list: true,
      ui: { itemProps: (item: { label?: string }) => ({ label: item?.label ?? 'Stat' }) },
      fields: [
        { type: 'string', label: 'Value', name: 'value' },
        { type: 'string', label: 'Label', name: 'label' },
        { type: 'string', label: 'Text', name: 'text', ui: { component: 'textarea' } },
      ],
    },
    { name: 'featureImage', label: 'Image', type: 'image' },
  ],
  ui: {
    defaultItem: {
      eyebrow: 'Why AquaPure',
      heading: 'Water treatment designed around Arizona homes.',
      paragraph: 'We’re a family business rooted in Scottsdale. For nearly two decades we’ve tested the Valley’s hardest water — well and municipal — and built systems that actually fix it.',
      stats: [
        { value: '20+', label: 'Years in Scottsdale', text: 'Serving Paradise Valley, Tempe, Mesa and the whole Valley since the mid-2000s.' },
        { value: 'Family owned', label: 'On-site testing', text: 'One local crew, one lab-verified test at your tap, no subcontracted sales team.' },
        { value: '100%', label: 'Custom for Arizona', text: 'Every system sized to your home’s exact hardness — no generic box, every tap protected.' },
      ],
    },
  },
};
