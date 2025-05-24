"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shareable = Shareable;
function Shareable(options) {
    return function (target) {
        target.prototype.share = function (id) {
            if (!this.configService) {
                throw new Error('dependency not found.');
            }
            const baseUrl = this.configService.get('DEEPLINKS_BASE_URL');
            return `${baseUrl}/${options.sharePath}/${id}`;
        };
    };
}
//# sourceMappingURL=action.shareable.js.map