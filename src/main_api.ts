import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppLauncher } from './app.launcher';
import { InitFirebaseApp } from './common/services/firebase';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const loggerService = app.get(Logger);
    const firebaseServiceAccountPath: string = configService.get('FIREBASE_SECRET_PATH');
    InitFirebaseApp(firebaseServiceAccountPath);

    const appLauncher = new AppLauncher(app, configService, loggerService);
    appLauncher.setup();
    await appLauncher.launch();
}

void bootstrap();
