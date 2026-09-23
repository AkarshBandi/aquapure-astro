import type { Template } from 'tinacms';

export const accordionBlockSchema: Template = {
  name: 'accordion',
  label: 'Accordion',
  fields: [
    { type: 'string', label: 'Headline', name: 'headline' },
    {
      type: 'object',
      label: 'Items',
      name: 'items',
      list: true,
      ui: {
        itemProps: (item: { title?: string }) => ({ label: item?.title ?? 'Item' }),
      },
      fields: [
        { type: 'string', label: 'Title', name: 'title' },
        { type: 'rich-text', label: 'Content', name: 'content' },
      ],
    },
  ],
};
