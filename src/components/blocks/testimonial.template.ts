import type { Template } from 'tinacms';

export const testimonialBlockSchema: Template = {
  name: 'testimonial',
  label: 'Testimonial',
  fields: [
    { type: 'string', label: 'Quote', name: 'quote', ui: { component: 'textarea' } },
    { type: 'string', label: 'Author', name: 'author' },
    { type: 'string', label: 'Role', name: 'role' },
    {
      type: 'object',
      label: 'Avatar',
      name: 'avatar',
      fields: [
        { name: 'src', label: 'Image source', type: 'image' },
        { name: 'alt', label: 'Alt text', type: 'string' },
      ],
    },
  ],
  ui: {
    defaultItem: {
      quote: 'This product changed how we work.',
      author: 'Jane Doe',
      role: 'CEO, Example Co.',
    },
  },
};
