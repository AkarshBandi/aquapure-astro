import type { Template } from 'tinacms';

export const mediaBlockSchema: Template = {
  name: 'media',
  label: 'Media',
  fields: [
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        { name: 'src', label: 'Image source', type: 'image' },
        { name: 'alt', label: 'Alt text', type: 'string' },
        { name: 'caption', label: 'Caption', type: 'string' },
      ],
    },
    {
      type: 'string',
      label: 'Aspect',
      name: 'aspect',
      options: [
        { label: '16:9', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: '1:1', value: '1/1' },
      ],
    },
  ],
};
