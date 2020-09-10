import {Context} from 'koa';

import createTopLevelRedirect from './create-top-level-redirect';
import getCookieOptions from './cookie-options';

import {TOP_LEVEL_OAUTH_COOKIE_NAME} from './index';

export default function createTopLevelOAuthRedirect(
  apiKey: string | ((ctx: Context) => Promise<string>),
  path: string,
) {
  const redirect = createTopLevelRedirect(apiKey, path);

  return async function topLevelOAuthRedirect(ctx: Context) {
    ctx.cookies.set(TOP_LEVEL_OAUTH_COOKIE_NAME, '1', getCookieOptions(ctx));
    await redirect(ctx);
  };
}
