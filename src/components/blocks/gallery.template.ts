import type { Template } from 'tinacms';

export const galleryBlockSchema: Template = {
  name: 'gallery',
  label: 'Gallery',
  fields: [
    { type: 'string', label: 'Headline', name: 'headline' },
    {
      type: 'object',
      label: 'Images',
      name: 'images',
      list: true,
      ui: {
        itemProps: (item: { alt?: string }) => ({ label: item?.alt ?? 'Image' }),
      },
      fields: [
        { name: 'src', label: 'Image source', type: 'image' },
        { name: 'alt', label: 'Alt text', type: 'string' },
        { name: 'caption', label: 'Caption', type: 'string' },
      ],
    },
  ],
};
