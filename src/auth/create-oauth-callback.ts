import querystring from 'querystring';

import {Context} from 'koa';

import {AuthConfig} from '../types';

import Error from './errors';
import validateHmac from './validate-hmac';

export default function createOAuthCallback(config: AuthConfig) {
  return async function oAuthCallback(ctx: Context) {
    const {query, cookies} = ctx;
    const {code, hmac, shop, state: nonce} = query;
    let {apiKey, secret, afterAuth} = config;
    if (typeof apiKey === 'function') {
      apiKey = await apiKey(ctx);
    }
    if (typeof secret === 'function') {
      secret = await secret(ctx);
    }

    if (nonce == null || cookies.get('shopifyNonce') !== nonce) {
      ctx.throw(403, Error.NonceMatchFailed);
    }

    if (shop == null) {
      ctx.throw(400, Error.ShopParamMissing);
      return;
    }

    if (validateHmac(hmac, secret, query) === false) {
      ctx.throw(400, Error.InvalidHmac);
      return;
    }

    /* eslint-disable @typescript-eslint/camelcase */
    const accessTokenQuery = querystring.stringify({
      code,
      client_id: apiKey,
      client_secret: secret,
    });
    /* eslint-enable @typescript-eslint/camelcase */

    const accessTokenResponse = await fetch(
      `https://${shop}/admin/oauth/access_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(accessTokenQuery).toString(),
        },
        body: accessTokenQuery,
      },
    );

    if (!accessTokenResponse.ok) {
      ctx.throw(401, Error.AccessTokenFetchFailure);
      return;
    }

    const accessTokenData = await accessTokenResponse.json();
    const {access_token: accessToken} = accessTokenData;

    if (ctx.session) {
      ctx.session.shop = shop;
      ctx.session.accessToken = accessToken;
    }

    ctx.state.shopify = {
      shop,
      accessToken,
    };

    if (afterAuth) {
      await afterAuth(ctx);
    }
  };
}
