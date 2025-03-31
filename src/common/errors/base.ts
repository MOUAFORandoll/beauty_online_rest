import { AppErrorCode } from "./error.codes";
import { HttpStatus } from "./httpStatus";

 
export class AppBaseError extends Error {
    public message!: string;
    public errorCode!: AppErrorCode;
    public statusCode!: HttpStatus;

    constructor({message, code, statusCode}: { message: string, code?: AppErrorCode, statusCode?: HttpStatus }) {
        super(message);
        this.message = message;
        this.errorCode = code ?? AppErrorCode.INTERNAL_SERVER_ERROR;
        this.statusCode = statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    }

    serializeJSON() {
        return {
            message: this.message,
            errorCode: this.errorCode,
            statusCode: this.statusCode,
        };
    }

}