import {HttpStatus} from "./httpStatus";
import {AppErrorCode} from "./error.codes";
import {AppBaseError} from "./base";

export class AppServiceError extends AppBaseError {
    serviceName!: string;

    constructor({serviceName, message}: { serviceName: string, message?: string }) {
        super({
            code: AppErrorCode.INTERNAL_SERVER_ERROR,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: message ?? "Internal service Error",
        });

        this.serviceName = serviceName;
    }
}