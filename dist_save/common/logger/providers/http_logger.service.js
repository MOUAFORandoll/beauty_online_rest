"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var HttpLoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const on_finished_1 = __importDefault(require("on-finished"));
const on_headers_1 = __importDefault(require("on-headers"));
const process = __importStar(require("process"));
const strings_helper_service_1 = require("./strings_helper.service");
let HttpLoggerService = HttpLoggerService_1 = class HttpLoggerService {
    constructor(logger, stringsHelperService) {
        this.logger = logger;
        this.stringsHelperService = stringsHelperService;
    }
    setAppName(appName) {
        this.appName = appName;
    }
    __clfDate(dateTime) {
        const date = dateTime.getUTCDate(), hours = dateTime.getUTCHours();
        const minutes = dateTime.getUTCMinutes(), seconds = dateTime.getUTCSeconds();
        const year = dateTime.getUTCFullYear(), month = HttpLoggerService_1.MONTHS[dateTime.getUTCMonth()];
        const milliseconds = dateTime.getUTCMilliseconds();
        return (date.toString(10).padStart(2, '0') +
            '/' +
            month +
            '/' +
            year +
            ' ' +
            hours.toString(10).padStart(2, '0') +
            ':' +
            minutes.toString(10).padStart(2, '0') +
            ':' +
            seconds.toString(10).padStart(2, '0') +
            ':' +
            milliseconds.toString(10).padStart(3, '0'));
    }
    __headersSent(res) {
        return typeof res.headersSent !== 'boolean' ? Boolean(res._header) : res.headersSent;
    }
    __recordStartTime() {
        this._startAt = process.hrtime();
        this._startTime = new Date();
    }
    user(req) {
        return `User ${req?.['user']?.['user_id']} (${req?.['user']?.['username']})` || '%Public%';
    }
    remoteAddress(req) {
        return req.ip || (req.connection && req.connection.remoteAddress) || undefined;
    }
    ipAddress(req) {
        return req['ipAddress'];
    }
    requestDate(req, format) {
        const date = new Date();
        switch (format || 'clf') {
            case 'clf':
                return this.__clfDate(date);
            case 'iso':
                return date.toISOString();
            default:
                return date.toUTCString();
        }
    }
    requestMethod(req) {
        return req.method;
    }
    url(req) {
        return req.originalUrl || req.url;
    }
    httpVersion(req) {
        return req.httpVersionMajor + '.' + req.httpVersionMinor;
    }
    resStatus(req, res) {
        return this.__headersSent(res) ? String(res.statusCode) : undefined;
    }
    resTime(req, res) {
        if (!req._startAt || !res._startAt) {
            return;
        }
        const ms = (res._startAt[0] - req._startAt[0]) * 1e3 + (res._startAt[1] - req._startAt[1]) * 1e-6;
        return ms.toFixed(3);
    }
    referrer(req) {
        return req.headers['referer'] || req.headers['referrer'];
    }
    userAgent(req) {
        return req.headers['user-agent'];
    }
    __formatLogLine(req, res, format) {
        let line = HttpLoggerService_1.FORMATS[format] || HttpLoggerService_1.FORMATS.DEFAULT;
        for (const token of Object.keys(HttpLoggerService_1.TOKENS)) {
            switch (token) {
                case 'CALLER':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.CALLER, this.user(req));
                    break;
                case 'REMOTE_ADDRESS':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.REMOTE_ADDRESS, this.remoteAddress(req));
                    break;
                case 'IP_ADDRESS':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.IP_ADDRESS, this.ipAddress(req));
                    break;
                case 'DATE':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.DATE, this.requestDate(req, 'clf'));
                    break;
                case 'METHOD':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.METHOD, this.requestMethod(req));
                    break;
                case 'URL':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.URL, this.url(req));
                    break;
                case 'HTTP_VERSION':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.HTTP_VERSION, this.httpVersion(req));
                    break;
                case 'RES_STATUS':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.RES_STATUS, this.resStatus(req, res));
                    break;
                case 'RES_TIME':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.RES_TIME, this.resTime(req, res));
                    break;
                case 'REFERRER':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.REFERRER, this.referrer(req));
                    break;
                case 'USER_AGENT':
                    line = this.stringsHelperService.replaceAll(line, HttpLoggerService_1.TOKENS.USER_AGENT, this.userAgent(req));
                    break;
            }
        }
        return line;
    }
    logRequest(print, req, res, fmt) {
        if (!print) {
            return;
        }
        const line = this.__formatLogLine(req, res, fmt);
        if (!line) {
            return;
        }
        this.logger.log(`${this.appName ? `[${this.appName}] ` : ''}${line}`);
    }
    httpLogger(format, options) {
        let fmt = format || 'default';
        let opts = options || {};
        if (format && typeof format === 'object') {
            opts = format;
            fmt = opts.format || 'default';
        }
        if (!fmt || !Object.keys(HttpLoggerService_1.FORMATS).includes(fmt.toUpperCase())) {
            fmt = 'default';
        }
        fmt = fmt.toUpperCase();
        const immediate = opts.immediate || false;
        const print = opts.print || true;
        return (req, res, next) => {
            const startTime = process.hrtime();
            const startDate = new Date();
            req._startAt = startTime;
            req._startTime = startDate;
            res._startAt = undefined;
            res._startTime = undefined;
            if (immediate) {
                this.logRequest(print, req, res, fmt);
            }
            else {
                const endTime = process.hrtime();
                const endDate = new Date();
                res._startAt = endTime;
                res._startTime = endDate;
                (0, on_headers_1.default)(res, this.__recordStartTime);
                (0, on_finished_1.default)(res, () => {
                    this.logRequest(print, req, res, fmt);
                });
            }
            next();
        };
    }
    use(req, res, next) {
        this.httpLogger('default', {})(req, res, next);
    }
};
HttpLoggerService.TOKENS = {
    CALLER: '@caller',
    REMOTE_ADDRESS: '@remote_address',
    IP_ADDRESS: '@ip_address',
    DATE: '@date',
    METHOD: '@method',
    URL: '@url',
    HTTP_VERSION: '@http_version',
    RES_STATUS: '@res_status',
    RES_TIME: '@res_time',
    REFERRER: '@referrer',
    USER_AGENT: '@usr_agent',
};
HttpLoggerService.FORMATS = {
    DEFAULT: `(HTTP REQUEST) - ${HttpLoggerService_1.TOKENS.IP_ADDRESS} [${HttpLoggerService_1.TOKENS.CALLER}] - ` +
        `${HttpLoggerService_1.TOKENS.DATE} - [${HttpLoggerService_1.TOKENS.METHOD} ${HttpLoggerService_1.TOKENS.URL} ` +
        `HTTP/${HttpLoggerService_1.TOKENS.HTTP_VERSION}] ${HttpLoggerService_1.TOKENS.RES_STATUS} ` +
        `${HttpLoggerService_1.TOKENS.RES_TIME} ms - "${HttpLoggerService_1.TOKENS.USER_AGENT}"`,
};
HttpLoggerService.MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
HttpLoggerService = HttpLoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        strings_helper_service_1.StringsHelperService])
], HttpLoggerService);
exports.default = HttpLoggerService;
//# sourceMappingURL=http_logger.service.js.map