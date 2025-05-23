import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class DeepLinksAppLauncher {
    private readonly app;
    private readonly configService;
    private readonly logger;
    routeDocumentation: string | undefined;
    appName: string | undefined;
    constructor(app: INestApplication, configService: ConfigService, logger: Logger);
    setup(): void;
    private setupCors;
    private setupErrorHandler;
    private setupGlobalPipes;
    private setupIpAddressMiddleware;
    private setupSwagger;
    launch(): Promise<void>;
}
