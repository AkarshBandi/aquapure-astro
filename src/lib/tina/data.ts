import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

export const getConfig = () =>
  requestWithMetadata(client.queries.config({ relativePath: 'config.json' }));

export const getPage = (slug: string) =>
  requestWithMetadata(client.queries.page({ relativePath: `${slug}.mdx` }), {
    priority: 'primary',
  });

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
