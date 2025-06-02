"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppAuthorizationError = exports.AppAuthenticationError = void 0;
const base_1 = require("./base");
const error_codes_1 = require("./error.codes");
const httpStatus_1 = require("./httpStatus");
class AppAuthenticationError extends base_1.AppBaseError {
    constructor(message, code) {
        super({
            message: message ?? "Authentication error",
            statusCode: httpStatus_1.HttpStatus.UNAUTHENTICATED_USER,
            code: code ?? error_codes_1.AppErrorCode.AUTHENTICATION_ERROR,
        });
    }
}
exports.AppAuthenticationError = AppAuthenticationError;
class AppAuthorizationError extends base_1.AppBaseError {
    constructor(message, code) {
        super({
            message: message ?? "Authentication error",
            statusCode: httpStatus_1.HttpStatus.UNAUTHORIZED_ACCESS,
            code: code ?? error_codes_1.AppErrorCode.AUTHORIZATION_ERROR,
        });
    }
}
exports.AppAuthorizationError = AppAuthorizationError;
//# sourceMappingURL=auth.js.map