import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import reactRenderer from '@astrojs/react/server.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { PREVIEW_CONTENT_TYPE, PRIME_HEADER } from '@tinacms/bridge/preview';
import { islands } from '../../lib/tina/islands';

export const prerender = false;

// Same store keys as @tinacms/astro internals (Symbol.for on globalThis),
// so requestWithMetadata() form registration keeps working.
const FORMS_KEY = Symbol.for('@tinacms/astro/forms-store');
const REQUEST_KEY = Symbol.for('@tinacms/astro/request-context');

function getStore(key: symbol): AsyncLocalStorage<any> {
  const g = globalThis as any;
  if (!g[key]) g[key] = new AsyncLocalStorage();
  return g[key];
}

function escapeAttr(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderFormPayloadDiv(form: any, primary: boolean) {
  return `<div data-tina-form="${escapeAttr(JSON.stringify(form))}"${primary ? ' data-tina-primary' : ''} hidden></div>`;
}

// Mirror of @tinacms/astro experimental_createIslandRoute, but with the
// React server renderer registered: AstroContainer.create() defaults to
// zero renderers, so any React island (CtaForm, CountUp, ProcessTimeline)
// crashes the page/blog island with "Invalid hook call" (HTTP 500) and the
// editor sidebar never receives its form.
export const ALL: APIRoute = async ({ params, request, url }) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes(PREVIEW_CONTENT_TYPE)) {
    return new Response('Not Found', { status: 404 });
  }
  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return new Response('Forbidden', { status: 403 });
  }
  const island = (islands as any)[params.name ?? ''];
  if (!island) {
    return new Response(`Unknown island "${params.name}"`, { status: 404 });
  }
  const priming = request.headers.get(PRIME_HEADER) !== null;
  try {
    const container = await AstroContainer.create();
    container.addServerRenderer({ name: '@astrojs/react', renderer: reactRenderer as any });
    const formsStore = getStore(FORMS_KEY);
    const requestStore = getStore(REQUEST_KEY);
    const forms: any[] = [];
    const html = await requestStore.run(request, () =>
      formsStore.run(forms, async () => {
        const data = await island.fetch(request, url.searchParams);
        return container.renderToString(island.component, {
          props: island.propsFromData(data, url.searchParams),
        });
      })
    );
    const payloads = priming
      ? [...forms]
          .sort((a, b) => (a.priority === 'primary' ? 0 : 1) - (b.priority === 'primary' ? 0 : 1))
          .map((form) => renderFormPayloadDiv(form, form.priority === 'primary'))
          .join('')
      : '';
    const cls = island.wrapper?.className ? ` class="${escapeAttr(island.wrapper.className)}"` : '';
    const marker = escapeAttr(`${url.pathname}${url.search}`);
    const body = `${payloads}<${island.wrapper.tag}${cls} data-tina-island="${marker}">${html}</${island.wrapper.tag}>`;
    return new Response(body, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response('Island render failed', { status: 500 });
  }
};
