import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppLauncher } from './app.launcher';
import { InitFirebaseApp } from './common/services/firebase';

import { DeepLinksAppModule } from './deeplinks.app.module';
import { DeepLinksAppLauncher } from './deeplinks.launcher';
async function bootstrap() {
    await bootstrapRestApp();
    await bootstrapRedirectLink();
}
async function bootstrapRestApp() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const loggerService = app.get(Logger);
    const firebaseServiceAccountPath: string = configService.get('FIREBASE_SECRET_PATH');
    InitFirebaseApp(firebaseServiceAccountPath);

    const appLauncher = new AppLauncher(app, configService, loggerService);
    appLauncher.setup();
    await appLauncher.launch();
}

async function bootstrapRedirectLink() {
    ///////////////////////////////////////////////////////////////////////////

    const deepLinksApp = await NestFactory.create(DeepLinksAppModule, {});

    const dLConfigService = deepLinksApp.get(ConfigService);
    const dLLoggerService = deepLinksApp.get(Logger);

    const dLAppLauncher = new DeepLinksAppLauncher(deepLinksApp, dLConfigService, dLLoggerService);
    dLAppLauncher.setup();
    await dLAppLauncher.launch();
}
void bootstrap();
