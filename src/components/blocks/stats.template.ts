import type { Template } from 'tinacms';

export const statsBlockSchema: Template = {
  name: 'stats',
  label: 'Stats',
  fields: [
    { type: 'string', label: 'Headline', name: 'headline' },
    {
      type: 'object',
      label: 'Stats',
      name: 'items',
      list: true,
      ui: {
        itemProps: (item: { value?: string; label?: string }) => ({
          label: item?.value ? `${item.value} — ${item.label ?? ''}` : 'Stat',
        }),
      },
      fields: [
        { type: 'string', label: 'Value', name: 'value' },
        { type: 'string', label: 'Label', name: 'label' },
      ],
    },
  ],
  ui: {
    defaultItem: {
      headline: 'By the numbers',
      items: [
        { value: '99%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
      ],
    },
  },
};
