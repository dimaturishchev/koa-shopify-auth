import { Context } from 'koa';
import { OAuthStartOptions } from '../types';
export default function createOAuthStart(options: OAuthStartOptions, callbackPath: string): (ctx: Context) => Promise<void>;
//# sourceMappingURL=create-oauth-start.d.ts.map