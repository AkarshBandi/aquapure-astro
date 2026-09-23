// RUNTIME registry — add a new block here to make it available site-wide.
// Key must match the Tina template `name` (e.g. 'hero') and the Astro component.
import Hero from '../../components/blocks/Hero.astro';
import RichText from '../../components/blocks/RichText.astro';
import Media from '../../components/blocks/Media.astro';
import Cta from '../../components/blocks/Cta.astro';
import Gallery from '../../components/blocks/Gallery.astro';
import Accordion from '../../components/blocks/Accordion.astro';
import Stats from '../../components/blocks/Stats.astro';
import Testimonial from '../../components/blocks/Testimonial.astro';

export const blockRegistry = new Map<string, any>([
  ['hero', Hero],
  ['richText', RichText],
  ['media', Media],
  ['cta', Cta],
  ['gallery', Gallery],
  ['accordion', Accordion],
  ['stats', Stats],
  ['testimonial', Testimonial],
]);
