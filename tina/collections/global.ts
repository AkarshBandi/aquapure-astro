import type { Collection } from 'tinacms';

export const GlobalCollection: Collection = {
  name: 'config',
  label: 'Global config',
  path: 'src/content/config',
  format: 'json',
  ui: { global: true },
  fields: [
    {
      name: 'seo',
      label: 'Site identity & SEO',
      type: 'object',
      fields: [
        { name: 'title', label: 'Site name', type: 'string', required: true },
        { name: 'description', label: 'Default meta description', type: 'string', required: true },
      ],
    },
    {
      name: 'nav',
      label: 'Navigation menu',
      type: 'object',
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title ?? 'Link' }) },
      fields: [
        { name: 'title', label: 'Title', type: 'string', required: true },
        { name: 'link', label: 'Link', type: 'string', required: true },
      ],
    },
    {
      name: 'footerNote',
      label: 'Footer note',
      type: 'string',
      ui: { component: 'textarea' },
    },
  ],
};
