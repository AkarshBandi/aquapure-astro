import type { Collection } from 'tinacms';
import { aquaHeroBlockSchema } from '../../src/components/blocks/aquaHero.template';
import { knowWaterBlockSchema } from '../../src/components/blocks/knowWater.template';
import { systemWaterBlockSchema } from '../../src/components/blocks/systemWater.template';
import { whyWaterBlockSchema } from '../../src/components/blocks/whyWater.template';
import { ctaWaterBlockSchema } from '../../src/components/blocks/ctaWater.template';
import { heroBlockSchema } from '../../src/components/blocks/hero.template';
import { richTextBlockSchema } from '../../src/components/blocks/richText.template';
import { mediaBlockSchema } from '../../src/components/blocks/media.template';
import { ctaBlockSchema } from '../../src/components/blocks/cta.template';
import { galleryBlockSchema } from '../../src/components/blocks/gallery.template';
import { accordionBlockSchema } from '../../src/components/blocks/accordion.template';
import { statsBlockSchema } from '../../src/components/blocks/stats.template';
import { testimonialBlockSchema } from '../../src/components/blocks/testimonial.template';

export const PageCollection: Collection = {
  name: 'page',
  label: 'Pages',
  path: 'src/content/page',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') return '/';
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    {
      name: 'seoTitle',
      label: 'Meta title (SEO)',
      type: 'string',
      isTitle: true,
      required: true,
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Page sections',
      ui: { visualSelector: true },
      templates: [
        aquaHeroBlockSchema,
        knowWaterBlockSchema,
        systemWaterBlockSchema,
        whyWaterBlockSchema,
        ctaWaterBlockSchema,
        heroBlockSchema,
        richTextBlockSchema,
        mediaBlockSchema,
        ctaBlockSchema,
        galleryBlockSchema,
        accordionBlockSchema,
        statsBlockSchema,
        testimonialBlockSchema,
      ],
    },
  ],
};
