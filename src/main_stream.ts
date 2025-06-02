import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { StreamAppModule } from './stream.app.module';
import { StreamAppLauncher } from './stream.launcher';
async function bootstrap() {
    ///////////////////////////////////////////////////////////////////////////

    const streamApp = await NestFactory.create(StreamAppModule, {});

    const streamConfigService = streamApp.get(ConfigService);
    const streamLoggerService = streamApp.get(Logger);

    const streamAppLauncher = new StreamAppLauncher(
        streamApp,
        streamConfigService,
        streamLoggerService,
    );
    streamAppLauncher.setup();
    await streamAppLauncher.launch();
}
void bootstrap();
