import { Context } from 'koa';
export default function createTopLevelOAuthRedirect(apiKey: string | ((ctx: Context) => Promise<string>), path: string): (ctx: Context) => Promise<void>;
//# sourceMappingURL=create-top-level-oauth-redirect.d.ts.map