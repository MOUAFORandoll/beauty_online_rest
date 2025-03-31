import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cors from 'cors';
import { HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppErrorsHandler } from './common/errors';

export class MainAppLauncher {
    prefix: string | undefined;
    routeDocumentation: string | undefined;
    appName: string | undefined;
    constructor(
        private readonly app: INestApplication,
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {
        this.routeDocumentation = this.configService.get<string>('APP_ROUTE_DOCUMENTATION');
        this.prefix = this.configService.get('APP_ROUTE_PREFIX');
        this.appName = this.configService.get<string>('APP_NAME');
    }

    public setup(): void {
        this.setupCors();
        this.setupErrorHandler();
        this.setupGlobalPrefix();
        this.setupGlobalPipes();
        this.setupSwagger();
    }

    private setupCors(): void {
        this.app.use(cors());
    }

    private setupErrorHandler(): void {
        const httpAdapterHost = this.app.get<HttpAdapterHost>(HttpAdapterHost);
        this.app.useGlobalFilters(new AppErrorsHandler(httpAdapterHost));
    }

    private setupGlobalPrefix(): void {
        this.app.setGlobalPrefix(this.prefix);
    }

    private setupGlobalPipes(): void {
        this.app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
    }

    private setupSwagger(): void {
        const apiUrl = this.configService.get<string>('APP_API_URL');
        const env = this.configService.get<string>('ENVIRONMENT');

        const config = new DocumentBuilder()
            .setTitle(this.appName)
            .setDescription(
                `This documentation provides all endpoint and entities of ${this.appName} API`,
            )
            .setVersion('1.0')
            .addServer(apiUrl, `For ${env} environment`)

            .addTag('Auth', 'Login & Authentications endpoints')
            .addTag('Users', 'User Accounts management endpoints')
            .addTag('Platforms', ' Application Platforms management endpoints')
            .addTag('Applications', 'User Projects management endpoints')
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',

                description: 'Firebase Authentication Token',
                name: 'Authorization',
                in: 'header',
            })

            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup(this.routeDocumentation, this.app, document);
    }
    public async launch(): Promise<void> {
        const port = this.configService.get<number>('PORT') ?? 8080;

        await this.app.listen(port, () => {
            this.logger.log(`Server ${this.appName} started on port ${port}`);
        });
    }
}
