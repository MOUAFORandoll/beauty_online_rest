"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLauncher = void 0;
const common_1 = require("@nestjs/common");
const cors_1 = __importDefault(require("cors"));
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("./common/errors");
class AppLauncher {
    constructor(app, configService, logger) {
        this.app = app;
        this.configService = configService;
        this.logger = logger;
        this.routeDocumentation = this.configService.get('APP_ROUTE_DOCUMENTATION');
        this.prefix = this.configService.get('APP_ROUTE_PREFIX');
        this.appName = this.configService.get('APP_NAME');
    }
    setup() {
        this.setupCors();
        this.setupErrorHandler();
        this.setupGlobalPrefix();
        this.setupGlobalPipes();
        this.setupSwagger();
    }
    setupCors() {
        this.app.use((0, cors_1.default)());
    }
    setupErrorHandler() {
        const httpAdapterHost = this.app.get(core_1.HttpAdapterHost);
        this.app.useGlobalFilters(new errors_1.AppErrorsHandler(httpAdapterHost));
    }
    setupGlobalPrefix() {
        this.app.setGlobalPrefix(this.prefix);
    }
    setupGlobalPipes() {
        this.app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
        }));
    }
    setupSwagger() {
        const apiUrl = this.configService.get('APP_API_URL');
        const env = this.configService.get('ENVIRONMENT');
        const config = new swagger_1.DocumentBuilder()
            .setTitle(this.appName)
            .setDescription(`This documentation provides all endpoint and entities of ${this.appName} API`)
            .setVersion('1.0')
            .addServer(apiUrl, `For ${env} environment`)
            .addTag('Auth', 'Endpoints for authentication and login')
            .addTag('Actus', 'Endpoints for All Users Actu')
            .addTag('Users', 'Endpoints for managing user accounts')
            .addTag('Realisations', 'Endpoints for managing user realisations')
            .addTag('Agenda', 'Endpoints for managing user agendas')
            .addTag('RendezVous', 'Endpoints for managing user appointments')
            .addTag('ProfileProfessionnels', 'Endpoints for managing professional profiles')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            description: 'Firebase Authentication Token',
            name: 'Authorization',
            in: 'header',
        })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(this.app, config);
        swagger_1.SwaggerModule.setup(this.routeDocumentation, this.app, document);
    }
    async launch() {
        const port = this.configService.get('PORT') ?? 8080;
        await this.app.listen(port, () => {
            this.logger.log(`Server ${this.appName} started on port ${port}`);
        });
    }
}
exports.AppLauncher = AppLauncher;
//# sourceMappingURL=app.launcher.js.map