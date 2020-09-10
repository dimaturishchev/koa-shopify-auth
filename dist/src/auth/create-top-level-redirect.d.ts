import { Context } from 'koa';
export default function createTopLevelRedirect(apiKey: string | ((ctx: Context) => Promise<string>), path: string): (ctx: Context) => Promise<void>;
//# sourceMappingURL=create-top-level-redirect.d.ts.map