import {Context} from 'koa';

export type AccessMode = 'online' | 'offline';

export interface AuthConfig {
  secret: string | ((ctx: Context) => Promise<string>);
  apiKey: string | ((ctx: Context) => Promise<string>);
  myShopifyDomain?: string;
  accessMode?: 'online' | 'offline';
  afterAuth?(ctx: Context): void;
}

export interface OAuthStartOptions extends AuthConfig {
  prefix?: string;
  scopes?: string[];
}

export interface NextFunction {
  (): any;
}
