"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResourceNotFoundError = void 0;
const base_1 = require("./base");
const error_codes_1 = require("./error.codes");
const httpStatus_1 = require("./httpStatus");
class AppResourceNotFoundError extends base_1.AppBaseError {
    constructor(message) {
        super({
            message: message ?? 'Resource not found',
            statusCode: httpStatus_1.HttpStatus.RESOURCE_NOT_FOUND,
            code: error_codes_1.AppErrorCode.RESOURCE_NOT_FOUND_ERROR,
        });
    }
}
exports.AppResourceNotFoundError = AppResourceNotFoundError;
//# sourceMappingURL=notFound.js.map