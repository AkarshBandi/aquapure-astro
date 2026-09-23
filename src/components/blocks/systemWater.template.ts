import type { Template } from 'tinacms';

export const systemWaterBlockSchema: Template = {
  name: 'systemWater',
  label: 'Whole House System',
  fields: [
    { type: 'string', label: 'Eyebrow', name: 'eyebrow' },
    { type: 'string', label: 'Heading', name: 'heading' },
    { type: 'string', label: 'Description', name: 'description', ui: { component: 'textarea' } },
    { type: 'string', label: 'Consultation label', name: 'consultationLabel' },
    { type: 'string', label: 'Consultation link', name: 'consultationLink' },
    { type: 'string', label: 'More label', name: 'moreLabel' },
    { type: 'string', label: 'More link', name: 'moreLink' },
    {
      type: 'object',
      label: 'Stages',
      name: 'stages',
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title ?? 'Stage' }) },
      fields: [
        { type: 'string', label: 'Title', name: 'title' },
        { type: 'string', label: 'Text', name: 'text', ui: { component: 'textarea' } },
        { name: 'image', label: 'Image', type: 'image' },
        { type: 'string', label: 'Fact badge', name: 'fact' },
      ],
    },
  ],
  ui: {
    defaultItem: {
      eyebrow: 'How it works',
      heading: 'Whole house water system',
      description: 'We don’t sell generic boxes off a shelf. We engineer a targeted system scaled for your home’s exact water chemistry.',
      consultationLabel: 'Free consultation',
      moreLabel: 'More ›',
      stages: [
        { title: 'Sediment and carbon block the big threats', text: 'Sediment and carbon block structures intercept visible particles and chlorine early.', fact: 'Hardness 15–25 gpg' },
        { title: 'Ion exchange removes the hardness', text: 'Resin exchanges calcium and magnesium for sodium, softening the water without harsh chemicals.', fact: 'Whole-house — every tap' },
        { title: 'Final pass for pure taste', text: 'A carbon polishing pass ensures crisp, bottle-quality taste at every tap.', fact: 'Family-owned — ~20 years' },
      ],
    },
  },
};
