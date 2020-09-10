"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var querystring_1 = tslib_1.__importDefault(require("querystring"));
var nonce_1 = tslib_1.__importDefault(require("nonce"));
var cookie_options_1 = tslib_1.__importDefault(require("./cookie-options"));
var createNonce = nonce_1.default();
function oAuthQueryString(ctx, options, callbackPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var host, cookies, _a, scopes, apiKey, accessMode, requestNonce, processedApiKey, redirectParams;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    host = ctx.host, cookies = ctx.cookies;
                    _a = options.scopes, scopes = _a === void 0 ? [] : _a, apiKey = options.apiKey, accessMode = options.accessMode;
                    requestNonce = createNonce();
                    cookies.set('shopifyNonce', requestNonce, cookie_options_1.default(ctx));
                    if (!(typeof apiKey === 'function')) return [3 /*break*/, 2];
                    return [4 /*yield*/, apiKey(ctx)];
                case 1:
                    processedApiKey = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    processedApiKey = apiKey;
                    _b.label = 3;
                case 3:
                    redirectParams = {
                        state: requestNonce,
                        scope: scopes.join(', '),
                        client_id: processedApiKey,
                        redirect_uri: "https://" + host + callbackPath,
                    };
                    /* eslint-enable @typescript-eslint/camelcase */
                    if (accessMode === 'online') {
                        redirectParams['grant_options[]'] = 'per-user';
                    }
                    return [2 /*return*/, querystring_1.default.stringify(redirectParams)];
            }
        });
    });
}
exports.default = oAuthQueryString;
