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
      description: 'We don’t sell generic boxes off a shelf. We engineer a targeted 6-stage system scaled for your home’s exact water chemistry.',
      consultationLabel: 'Free consultation',
      moreLabel: 'More',
      stages: [
        { title: 'Stage 1 — Sediment pre-filter', text: 'Intercepts sand, silt and visible particles so downstream stages stay clean.', fact: 'Step 1 — protects' },
        { title: 'Stage 2 — Ion-exchange softening', text: 'Resin exchanges calcium & magnesium — removes hardness (Arizona 15–25 gpg) without adding sodium.', fact: 'Step 2 — softens' },
        { title: 'Stage 3 — Carbon — chlorine & chemicals', text: 'Activated carbon strips chlorine and DBPs that dry skin and off-gas in hot showers.', fact: 'Step 3 — filters' },
        { title: 'Stage 4 — Heavy metals & arsenic', text: 'Targeted media removes heavy metals and arsenic from every drop.', fact: 'Step 4 — filters' },
        { title: 'Stage 5 — Bacteria & pesticides', text: 'Purification barrier removes bacteria and pesticides for safe water at every faucet.', fact: 'Step 5 — purifies' },
        { title: 'Stage 6 — pH balance & polish', text: 'Final polish balances pH, self-cleaning — no filters to change, pure at every tap and appliance.', fact: 'Step 6 — balances pH' },
      ],
    },
  },
};
