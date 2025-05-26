import { AppErrorCode } from "./error.codes";
import { HttpStatus } from "./httpStatus";
export declare class AppBaseError extends Error {
    message: string;
    errorCode: AppErrorCode;
    statusCode: HttpStatus;
    constructor({ message, code, statusCode }: {
        message: string;
        code?: AppErrorCode;
        statusCode?: HttpStatus;
    });
    serializeJSON(): {
        message: string;
        errorCode: AppErrorCode;
        statusCode: HttpStatus;
    };
}
