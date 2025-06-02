"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHENTICATED_USER"] = 401] = "UNAUTHENTICATED_USER";
    HttpStatus[HttpStatus["UNAUTHORIZED_ACCESS"] = 403] = "UNAUTHORIZED_ACCESS";
    HttpStatus[HttpStatus["RESOURCE_NOT_FOUND"] = 404] = "RESOURCE_NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
//# sourceMappingURL=httpStatus.js.map