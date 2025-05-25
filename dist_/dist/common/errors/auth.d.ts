import { AppBaseError } from "./base";
import { AppErrorCode } from "./error.codes";
export declare class AppAuthenticationError extends AppBaseError {
    constructor(message?: string, code?: AppErrorCode);
}
export declare class AppAuthorizationError extends AppBaseError {
    constructor(message?: string, code?: AppErrorCode);
}
