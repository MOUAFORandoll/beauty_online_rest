import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppLauncher {
    private readonly app;
    private readonly configService;
    private readonly logger;
    prefix: string | undefined;
    routeDocumentation: string | undefined;
    appName: string | undefined;
    constructor(app: INestApplication, configService: ConfigService, logger: Logger);
    setup(): void;
    private setupCors;
    private setupErrorHandler;
    private setupGlobalPrefix;
    private setupGlobalPipes;
    private setupSwagger;
    launch(): Promise<void>;
}
