"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamAppLauncher = void 0;
const common_1 = require("@nestjs/common");
const cors_1 = __importDefault(require("cors"));
const core_1 = require("@nestjs/core");
const request_ip_1 = __importDefault(require("request-ip"));
const errors_1 = require("./common/errors");
const swagger_1 = require("@nestjs/swagger");
class StreamAppLauncher {
    constructor(app, configService, logger) {
        this.app = app;
        this.configService = configService;
        this.logger = logger;
        this.routeDocumentation = this.configService.get('APP_ROUTE_DOCUMENTATION');
        this.appName = this.configService.get('APP_NAME');
    }
    setup() {
        this.setupCors();
        this.setupErrorHandler();
        this.setupGlobalPipes();
        this.setupIpAddressMiddleware();
        this.setupSwagger();
    }
    setupCors() {
        this.app.use((0, cors_1.default)());
    }
    setupErrorHandler() {
        const httpAdapterHost = this.app.get(core_1.HttpAdapterHost);
        this.app.useGlobalFilters(new errors_1.AppErrorsHandler(httpAdapterHost));
    }
    setupGlobalPipes() {
        this.app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    }
    setupIpAddressMiddleware() {
        this.app.use(request_ip_1.default.mw({ attributeName: 'ipAddress' }));
    }
    setupSwagger() {
        const apiUrl = this.configService.get('STREAM_URL');
        const env = this.configService.get('ENVIRONMENT');
        const config = new swagger_1.DocumentBuilder()
            .setTitle(this.appName)
            .setDescription(`This documentation provides all endpoint and entities of ${this.appName} API`)
            .setVersion('1.0')
            .addServer(apiUrl, `For ${env} environment`)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(this.app, config);
        swagger_1.SwaggerModule.setup(this.routeDocumentation, this.app, document);
    }
    async launch() {
        const port = this.configService.get('STREAM_PORT');
        const appName = this.configService.get('STREAM_APP_NAME');
        await this.app.listen(port, () => {
            this.logger.log(`Server ${appName} started on port ${port}`);
        });
    }
}
exports.StreamAppLauncher = StreamAppLauncher;
//# sourceMappingURL=stream.launcher.js.map