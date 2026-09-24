import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

export const getConfig = async () => {
  try {
    return await requestWithMetadata(client.queries.config({ relativePath: 'config.json' }));
  } catch {
    return { data: { config: null } } as any;
  }
};

const fallbackHome: any = {
  seoTitle: 'AquaPure — Clean water for the whole home | Scottsdale, AZ',
  blocks: [
    { __typename: 'PageBlocksAquaHero', eyebrow: 'Whole-home water treatment', title: 'Clean water for the whole home', description: 'We are a family-owned Scottsdale company engineering custom filtration for Arizona’s hard water. Protect your family and your pipes.', primaryLabel: 'Free consultation', primaryLink: '#test', secondaryLabel: 'See rates', secondaryLink: '#rates', background: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1920' },
    { __typename: 'PageBlocksKnowWater', eyebrow: 'Why it matters', heading: 'Know your water', paragraph: 'Hard water scales your pipes and cuts your water heater life in half. Chlorine dries your skin and you breathe it in during hot showers.', subFeatures: [{ title: 'Calcium & magnesium', text: 'Destroys appliances from the inside and leaves chalky residue on fixtures.' }, { title: 'Municipal chlorine', text: 'Strips natural oils from skin and degrades indoor air quality.' }], featureImage: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800', learnLabel: 'Learn how it works', learnLink: '#systems', moreLabel: 'More', moreLink: '#systems' },
    { __typename: 'PageBlocksSystemWater', eyebrow: 'How it works', heading: 'Whole house water system — 6 stages', description: 'Custom-built for us — you won’t find it anywhere else. 6 stages remove calcium (hardness), harmful chemicals, chlorine & DBPs, heavy metals, arsenic, bacteria and pesticides. Softens, filters, purifies and balances pH — self-cleaning, no sodium added, pure at every faucet.', consultationLabel: 'Free consultation', consultationLink: '#test', moreLabel: 'More', moreLink: '#systems', stages: [
      { title: 'Stage 1 — Sediment pre-filter', text: 'Intercepts sand, silt and visible particles before they can foul the system. First line of defense from our_systems.php.', image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800', fact: 'Step 1 — protects' },
      { title: 'Stage 2 — Ion-exchange softening', text: 'Resin exchanges calcium & magnesium — removes hardness (Arizona 15–25 gpg) without adding sodium to the water.', image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800', fact: 'Step 2 — softens' },
      { title: 'Stage 3 — Carbon — chlorine & DBPs', text: 'Activated carbon strips chlorine and disinfectant by-products that dry skin and off-gas when you shower.', image: 'https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=800', fact: 'Step 3 — filters' },
      { title: 'Stage 4 — Heavy metals & arsenic', text: 'Targeted media removes heavy metals and arsenic — the only whole-house system that filters these at every tap.', image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800', fact: 'Step 4 — filters' },
      { title: 'Stage 5 — Bacteria & pesticides', text: 'Purification barrier removes bacteria and pesticides — safe drinking water at every faucet, not just one.', image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800', fact: 'Step 5 — purifies' },
      { title: 'Stage 6 — pH balance & polish', text: 'Final polish balances pH, no filters to change — self-cleaning. Pure, healthy water to every appliance and faucet.', image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800', fact: 'Step 6 — balances pH' },
    ]},
    { __typename: 'PageBlocksWhyWater', eyebrow: 'Why AquaPure', heading: 'Water treatment designed around Arizona homes.', paragraph: 'We’re a family business rooted in Scottsdale. For nearly two decades we’ve tested the Valley’s hardest water — well and municipal — and built systems that actually fix it.', stats: [{ value: '20+', label: 'Years in Scottsdale', text: 'Serving Paradise Valley, Tempe, Mesa and the whole Valley since the mid-2000s.' }, { value: 'Family owned', label: 'On-site testing', text: 'One local crew, one lab-verified test at your tap, no subcontracted sales team.' }, { value: '100%', label: 'Custom for Arizona', text: 'Every system sized to your home’s exact hardness — no generic box, every tap protected.' }], featureImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { __typename: 'PageBlocksCtaWater', heading: 'Know what’s in your water.', text: 'Don’t guess with your family’s water and pipes. Book a free on-site test — we check it at your tap and explain the results plainly.', placeholder: 'Enter your email address', buttonLabel: 'Submit', disclaimer: 'By submitting, you agree to receive your test results by email. No spam, unsubscribe anytime.', background: 'https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  ],
};

export const getPage = async (slug: string) => {
  try {
    const res: any = await requestWithMetadata(client.queries.page({ relativePath: `${slug}.mdx` }), {
      priority: 'primary',
    });
    if (res?.data?.page) return res;
    if (slug === 'home') return { data: { page: fallbackHome } } as any;
    return res;
  } catch (e) {
    if (slug === 'home') return { data: { page: fallbackHome } } as any;
    return { data: { page: null } } as any;
  }
};

export const getBlog = (slug: string) =>
  requestWithMetadata(client.queries.blog({ relativePath: `${slug}.mdx` }), {
    priority: 'primary',
  });

export async function listPages() {
  const r = await client.queries.pageConnection();
  return (r.data.pageConnection.edges ?? []).flatMap((e) => (e?.node ? [e.node] : []));
}

export async function listBlogs() {
  const r = await client.queries.blogConnection();
  return (r.data.blogConnection.edges ?? [])
    .flatMap((e) => (e?.node ? [e.node] : []))
    .sort((a, b) => {
      const ad = a?.pubDate ? new Date(a.pubDate).valueOf() : 0;
      const bd = b?.pubDate ? new Date(b.pubDate).valueOf() : 0;
      return bd - ad;
    });
}

export type CmsConfig = Awaited<ReturnType<typeof getConfig>>['data']['config'];
export type CmsPage = Awaited<ReturnType<typeof getPage>>['data']['page'];
export type CmsBlog = Awaited<ReturnType<typeof getBlog>>['data']['blog'];

export type PageBlock = NonNullable<NonNullable<CmsPage['blocks']>[number]>;
