 
import {AppBaseError} from "./base";
import { AppErrorCode } from "./error.codes";
import { HttpStatus } from "./httpStatus";

export class AppAuthenticationError extends AppBaseError {
    constructor(message?: string, code?: AppErrorCode) {
        super({
            message: message ?? "Authentication error",
            statusCode: HttpStatus.UNAUTHENTICATED_USER,
            code: code ?? AppErrorCode.AUTHENTICATION_ERROR,
        });
    }
}

export class AppAuthorizationError extends AppBaseError {
    constructor(message?: string, code?: AppErrorCode) {
        super({
            message: message ?? "Authentication error",
            statusCode: HttpStatus.UNAUTHORIZED_ACCESS,
            code: code ?? AppErrorCode.AUTHORIZATION_ERROR,
        });
    }
}