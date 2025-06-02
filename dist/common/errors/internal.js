"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInternalServerError = void 0;
const base_1 = require("./base");
const error_codes_1 = require("./error.codes");
class AppInternalServerError extends base_1.AppBaseError {
    constructor(message) {
        super({
            code: error_codes_1.AppErrorCode.INTERNAL_SERVER_ERROR,
            message: message ?? "Internal Server Error",
        });
    }
}
exports.AppInternalServerError = AppInternalServerError;
//# sourceMappingURL=internal.js.map