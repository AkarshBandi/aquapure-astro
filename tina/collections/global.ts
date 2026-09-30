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
        name: 'header',
        label: 'Header',
        type: 'object',
        fields: [
          {
            name: 'logo',
            label: 'Logo',
            type: 'object',
            fields: [
              { name: 'src', label: 'Logo image', type: 'image' },
              { name: 'alt', label: 'Logo alt text', type: 'string' },
            ],
          },
          { name: 'logoLink', label: 'Logo link', type: 'string' },
          { name: 'logoHeight', label: 'Logo height (px)', type: 'string' },
          { name: 'ctaLabel', label: 'CTA label', type: 'string' },
          { name: 'ctaLink', label: 'CTA link', type: 'string' },
        ],
      },
      {
        name: 'footer',
        label: 'Footer',
        type: 'object',
        fields: [
          {
            name: 'links',
            label: 'Footer links',
            type: 'object',
            list: true,
            ui: { itemProps: (item: { title?: string }) => ({ label: item?.title ?? 'Link' }) },
            fields: [
              { name: 'title', label: 'Title', type: 'string' },
              { name: 'link', label: 'Link', type: 'string' },
            ],
          },
          { name: 'copyright', label: 'Copyright line', type: 'string' },
          { name: 'referencesLabel', label: 'References label', type: 'string' },
          {
            name: 'references',
            label: 'Reference links',
            type: 'object',
            list: true,
            ui: { itemProps: (item: { title?: string }) => ({ label: item?.title ?? 'Link' }) },
            fields: [
              { name: 'title', label: 'Title', type: 'string' },
              { name: 'link', label: 'Link', type: 'string' },
            ],
          },
        ],
      },
    ],
  };
