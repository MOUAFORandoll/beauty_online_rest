"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServiceError = void 0;
const httpStatus_1 = require("./httpStatus");
const error_codes_1 = require("./error.codes");
const base_1 = require("./base");
class AppServiceError extends base_1.AppBaseError {
    constructor({ serviceName, message }) {
        super({
            code: error_codes_1.AppErrorCode.INTERNAL_SERVER_ERROR,
            statusCode: httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: message ?? "Internal service Error",
        });
        this.serviceName = serviceName;
    }
}
exports.AppServiceError = AppServiceError;
//# sourceMappingURL=service.js.map