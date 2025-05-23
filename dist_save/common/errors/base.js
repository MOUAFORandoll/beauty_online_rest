"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBaseError = void 0;
const error_codes_1 = require("./error.codes");
const httpStatus_1 = require("./httpStatus");
class AppBaseError extends Error {
    constructor({ message, code, statusCode }) {
        super(message);
        this.message = message;
        this.errorCode = code ?? error_codes_1.AppErrorCode.INTERNAL_SERVER_ERROR;
        this.statusCode = statusCode ?? httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    serializeJSON() {
        return {
            message: this.message,
            errorCode: this.errorCode,
            statusCode: this.statusCode,
        };
    }
}
exports.AppBaseError = AppBaseError;
//# sourceMappingURL=base.js.map