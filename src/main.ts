import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main.app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MainAppLauncher } from './main.app.launcher';
import { InitFirebaseApp } from './common/services/firebase';
import { FrontOfficeAppModule } from './apps/front_office/front_office.app.module';
import { FrontOfficeAppAppLauncher } from './apps/front_office/front_office.app.launcher';
import { DeveloperAppModule } from './apps/developer/developer.app.module';
import { DeveloperAppLauncher } from './apps/developer/developer.app.launcher';

async function bootstrap() {
    await bootstrapClient();
    await bootstrapFrontOfficeApp();
    await bootstrapDeveloperApp();
}

async function bootstrapClient() {
    const app = await NestFactory.create(MainAppModule);
    const configService = app.get(ConfigService);
    const loggerService = app.get(Logger);
    const firebaseServiceAccountPath: string = configService.get('FIREBASE_SECRET_PATH');
    InitFirebaseApp(firebaseServiceAccountPath);

    const appLauncher = new MainAppLauncher(app, configService, loggerService);
    appLauncher.setup();
    await appLauncher.launch();
}
async function bootstrapFrontOfficeApp() {
    const app = await NestFactory.create(FrontOfficeAppModule);

    const configService = app.get(ConfigService);
    const loggerService = app.get(Logger);

    const frontOfficeAppAppLauncher = new FrontOfficeAppAppLauncher(
        app,
        configService,
        loggerService,
    );
    frontOfficeAppAppLauncher.setup();
    await frontOfficeAppAppLauncher.launch();
}
async function bootstrapDeveloperApp() {
    const app = await NestFactory.create(DeveloperAppModule);

    const configService = app.get(ConfigService);
    const loggerService = app.get(Logger);

    const developerAppAppLauncher = new DeveloperAppLauncher(app, configService, loggerService);
    developerAppAppLauncher.setup();
    await developerAppAppLauncher.launch();
}

void bootstrap();
