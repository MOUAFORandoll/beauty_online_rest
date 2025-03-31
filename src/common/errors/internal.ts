import {AppBaseError} from "./base"; 
import { AppErrorCode } from "./error.codes";

export class AppInternalServerError extends AppBaseError {
    constructor(message?: string) {
        super({
            code: AppErrorCode.INTERNAL_SERVER_ERROR,
            message: message ?? "Internal Server Error",
        });
    }
}
