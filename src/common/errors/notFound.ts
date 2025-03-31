import { AppBaseError } from './base';
import { AppErrorCode } from './error.codes';
import { HttpStatus } from './httpStatus';

export class AppResourceNotFoundError extends AppBaseError {
    constructor(message?: string) {
        super({
            message: message ?? 'Resource not found',
            statusCode: HttpStatus.RESOURCE_NOT_FOUND,
            code: AppErrorCode.RESOURCE_NOT_FOUND_ERROR,
        });
    }
}
