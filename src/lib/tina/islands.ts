import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PageQuery, BlogQuery, ConfigQuery } from '../../../tina/__generated__/types';
import type { CmsPage, CmsBlog, CmsConfig } from './data';
import PageBody from '../../components/islands/PageBody.astro';
import BlogBody from '../../components/islands/BlogBody.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import { getPage, getBlog, getConfig } from './data';

export const islands: IslandRegistry = {
  page: {
    fetch: (_request, params) => getPage(params.get('slug') ?? 'home'),
    component: PageBody,
    wrapper: { tag: 'main' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PageQuery>).data?.page as CmsPage | undefined,
    }),
  },
  blog: {
    fetch: (_request, params) => getBlog(params.get('slug') ?? ''),
    component: BlogBody,
    wrapper: { tag: 'article' },
    propsFromData: (data) => ({
      data: (data as QueryResult<BlogQuery>).data?.blog as CmsBlog | undefined,
    }),
  },
  global: {
    fetch: () => getConfig(),
    component: Header,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      config: (data as QueryResult<ConfigQuery>).data?.config as CmsConfig | undefined,
    }),
  },
  'global-footer': {
    fetch: () => getConfig(),
    component: Footer,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      config: (data as QueryResult<ConfigQuery>).data?.config as CmsConfig | undefined,
    }),
  },
};
