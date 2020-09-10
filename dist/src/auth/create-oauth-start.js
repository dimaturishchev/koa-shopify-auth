"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors_1 = tslib_1.__importDefault(require("./errors"));
var oauth_query_string_1 = tslib_1.__importDefault(require("./oauth-query-string"));
var cookie_options_1 = tslib_1.__importDefault(require("./cookie-options"));
var index_1 = require("./index");
function createOAuthStart(options, callbackPath) {
    return function oAuthStart(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var myShopifyDomain, query, shop, shopRegex, formattedQueryString;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myShopifyDomain = options.myShopifyDomain;
                        query = ctx.query;
                        shop = query.shop;
                        shopRegex = new RegExp("^[a-z0-9][a-z0-9\\-]*[a-z0-9]\\." + myShopifyDomain + "$", 'i');
                        if (shop == null || !shopRegex.test(shop)) {
                            ctx.throw(400, errors_1.default.ShopParamMissing);
                            return [2 /*return*/];
                        }
                        ctx.cookies.set(index_1.TOP_LEVEL_OAUTH_COOKIE_NAME, '', cookie_options_1.default(ctx));
                        return [4 /*yield*/, oauth_query_string_1.default(ctx, options, callbackPath)];
                    case 1:
                        formattedQueryString = _a.sent();
                        ctx.redirect("https://" + shop + "/admin/oauth/authorize?" + formattedQueryString);
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = createOAuthStart;
