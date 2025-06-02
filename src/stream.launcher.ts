import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cors from 'cors';
import { HttpAdapterHost } from '@nestjs/core';
import requestIp from 'request-ip';
import { AppErrorsHandler } from './common/errors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class StreamAppLauncher {
    routeDocumentation: string | undefined;
    appName: string | undefined;
    constructor(
        private readonly app: INestApplication,
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {
        this.routeDocumentation = this.configService.get<string>('APP_ROUTE_DOCUMENTATION');
        this.appName = this.configService.get<string>('APP_NAME');
    }

    public setup(): void {
        this.setupCors();
        this.setupErrorHandler();
        this.setupGlobalPipes();
        this.setupIpAddressMiddleware();
        this.setupSwagger();
    }

    private setupCors(): void {
        this.app.use(cors());
    }

    private setupErrorHandler(): void {
        const httpAdapterHost = this.app.get<HttpAdapterHost>(HttpAdapterHost);
        this.app.useGlobalFilters(new AppErrorsHandler(httpAdapterHost));
    }

    private setupGlobalPipes(): void {
        this.app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    }

    private setupIpAddressMiddleware(): void {
        this.app.use(requestIp.mw({ attributeName: 'ipAddress' }));
    }

    private setupSwagger(): void {
        const apiUrl = this.configService.get<string>('STREAM_URL');
        const env = this.configService.get<string>('ENVIRONMENT');

        const config = new DocumentBuilder()
            .setTitle(this.appName)
            .setDescription(
                `This documentation provides all endpoint and entities of ${this.appName} API`,
            )
            .setVersion('1.0')
            .addServer(apiUrl, `For ${env} environment`)

            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup(this.routeDocumentation, this.app, document);
    }
    public async launch(): Promise<void> {
        const port = this.configService.get('STREAM_PORT');
        const appName = this.configService.get('STREAM_APP_NAME');

        await this.app.listen(port, () => {
            this.logger.log(`Server ${appName} started on port ${port}`);
        });
    }
}
