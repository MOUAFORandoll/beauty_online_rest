import { AppBaseError } from "./base";
export declare class AppServiceError extends AppBaseError {
    serviceName: string;
    constructor({ serviceName, message }: {
        serviceName: string;
        message?: string;
    });
}
