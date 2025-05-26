"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorsHandler = void 0;
const common_1 = require("@nestjs/common");
const apperror_1 = require("./apperror");
class AppErrorsHandler {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatusCode = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const url = httpAdapter.getRequestUrl(ctx.getRequest()).toString();
        const cause = exception instanceof common_1.HttpException ? exception.cause : exception;
        const errorRaw = exception instanceof common_1.HttpException ? exception.getResponse() : exception;
        if (!(exception instanceof common_1.HttpException)) {
            console.error(exception);
        }
        const responseBody = this.buildErrorPayload(errorRaw, httpStatusCode, url, cause);
        const errResponse = { error: responseBody };
        httpAdapter.reply(ctx.getResponse(), errResponse, httpStatusCode);
    }
    buildErrorPayload(response, httpStatusCode, url, cause) {
        if (typeof response === 'string') {
            return {
                details: {
                    cause,
                },
                display_messages: [
                    {
                        lang: 'en',
                        value: response,
                    },
                    {
                        lang: 'fr',
                        value: response,
                    },
                ],
                message: response,
                status_code: httpStatusCode,
                url: url,
                code: Object.keys(common_1.HttpStatus).find((x) => common_1.HttpStatus[x] === httpStatusCode),
            };
        }
        else if (typeof response === 'object') {
            if ((0, apperror_1.isAppErrorObject)(response)) {
                const iResponse = response;
                return {
                    details: {
                        cause,
                    },
                    display_messages: iResponse.display_messages || [
                        {
                            lang: 'en',
                            value: iResponse.message,
                        },
                        {
                            lang: 'fr',
                            value: iResponse.message,
                        },
                    ],
                    message: iResponse.message,
                    status_code: httpStatusCode,
                    url: url,
                    code: iResponse.code,
                };
            }
            else {
                const message = (response['message'] ||
                    cause?.['message'] ||
                    'An error occurred!').toString();
                return {
                    details: {
                        cause,
                    },
                    display_messages: [
                        {
                            lang: 'en',
                            value: message,
                        },
                        {
                            lang: 'fr',
                            value: message,
                        },
                    ],
                    message: message,
                    status_code: httpStatusCode,
                    url: url,
                    code: Object.keys(common_1.HttpStatus).find((x) => common_1.HttpStatus[x] === httpStatusCode),
                };
            }
        }
        else {
            const message = (cause?.['message'] || 'An error occurred!').toString();
            return {
                details: {
                    cause,
                },
                display_messages: [
                    {
                        lang: 'en',
                        value: message,
                    },
                    {
                        lang: 'fr',
                        value: message,
                    },
                ],
                message: message,
                status_code: httpStatusCode,
                url: url,
                code: Object.keys(common_1.HttpStatus).find((x) => common_1.HttpStatus[x] === httpStatusCode),
            };
        }
    }
}
exports.AppErrorsHandler = AppErrorsHandler;
//# sourceMappingURL=errorshandler.js.map