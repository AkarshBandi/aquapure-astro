import type { Template } from 'tinacms';

export const ctaWaterBlockSchema: Template = {
  name: 'ctaWater',
  label: 'Free water test CTA',
  fields: [
    { type: 'string', label: 'Heading', name: 'heading' },
    { type: 'string', label: 'Text', name: 'text', ui: { component: 'textarea' } },
    { type: 'string', label: 'Placeholder', name: 'placeholder' },
    { type: 'string', label: 'Button label', name: 'buttonLabel' },
    { type: 'string', label: 'Disclaimer', name: 'disclaimer' },
    { name: 'background', label: 'Background image', type: 'string' },
  ],
  ui: {
    defaultItem: {
      heading: 'Know what’s in your water.',
      text: 'Don’t guess with your family’s water and pipes. Book a free on-site test — we check it at your tap and explain the results plainly.',
      placeholder: 'Enter your email address',
      buttonLabel: 'Submit',
      disclaimer: 'By submitting, you agree to receive your test results by email. No spam, unsubscribe anytime.',
    },
  },
};
