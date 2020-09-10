import querystring from 'querystring';

import {Context} from 'koa';
import nonce from 'nonce';

import {OAuthStartOptions} from '../types';

import getCookieOptions from './cookie-options';

const createNonce = nonce();

export default async function oAuthQueryString(
  ctx: Context,
  options: OAuthStartOptions,
  callbackPath: string,
) {
  const {host, cookies} = ctx;
  const {scopes = [], apiKey, accessMode} = options;

  const requestNonce = createNonce();
  cookies.set('shopifyNonce', requestNonce, getCookieOptions(ctx));

  let processedApiKey;
  if (typeof apiKey === 'function') {
    processedApiKey = await apiKey(ctx);
  } else {
    processedApiKey = apiKey;
  }

  /* eslint-disable @typescript-eslint/camelcase */
  const redirectParams = {
    state: requestNonce,
    scope: scopes.join(', '),
    client_id: processedApiKey,
    redirect_uri: `https://${host}${callbackPath}`,
  };
  /* eslint-enable @typescript-eslint/camelcase */

  if (accessMode === 'online') {
    redirectParams['grant_options[]'] = 'per-user';
  }

  return querystring.stringify(redirectParams);
}
