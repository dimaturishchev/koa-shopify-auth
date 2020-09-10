import querystring from 'querystring';

import {Context} from 'koa';

import redirectionPage from './redirection-page';

export default function createTopLevelRedirect(apiKey: string | ((ctx: Context) => Promise<string>), path: string) {
  return async function topLevelRedirect(ctx: Context) {
    const {host, query} = ctx;
    const {shop} = query;
    let processedApiKey;
    if (typeof apiKey === 'function') {
      processedApiKey = await apiKey(ctx);
    } else {
      processedApiKey = apiKey;
    }

    console.log('processedApiKey', processedApiKey);

    const params = {shop};
    const queryString = querystring.stringify(params);

    ctx.body = redirectionPage({
      origin: shop,
      redirectTo: `https://${host}${path}?${queryString}`,
      apiKey: processedApiKey,
    });
  };
}
