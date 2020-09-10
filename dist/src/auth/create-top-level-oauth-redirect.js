"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var create_top_level_redirect_1 = tslib_1.__importDefault(require("./create-top-level-redirect"));
var cookie_options_1 = tslib_1.__importDefault(require("./cookie-options"));
var index_1 = require("./index");
function createTopLevelOAuthRedirect(apiKey, path) {
    var redirect = create_top_level_redirect_1.default(apiKey, path);
    return function topLevelOAuthRedirect(ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.cookies.set(index_1.TOP_LEVEL_OAUTH_COOKIE_NAME, '1', cookie_options_1.default(ctx));
                        return [4 /*yield*/, redirect(ctx)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = createTopLevelOAuthRedirect;
