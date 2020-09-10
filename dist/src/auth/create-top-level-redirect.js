"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var querystring_1 = tslib_1.__importDefault(require("querystring"));
var redirection_page_1 = tslib_1.__importDefault(require("./redirection-page"));
function createTopLevelRedirect(apiKey, path) {
    return function topLevelRedirect(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var host, query, shop, processedApiKey, params, queryString;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = ctx.host, query = ctx.query;
                        shop = query.shop;
                        if (!(typeof apiKey === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, apiKey(ctx)];
                    case 1:
                        processedApiKey = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        processedApiKey = apiKey;
                        _a.label = 3;
                    case 3:
                        console.log('processedApiKey', processedApiKey);
                        params = { shop: shop };
                        queryString = querystring_1.default.stringify(params);
                        ctx.body = redirection_page_1.default({
                            origin: shop,
                            redirectTo: "https://" + host + path + "?" + queryString,
                            apiKey: processedApiKey,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = createTopLevelRedirect;
