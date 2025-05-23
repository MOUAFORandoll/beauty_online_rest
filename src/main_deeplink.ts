import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common'; 
import { DeepLinksAppModule } from './deeplinks.app.module';
import { DeepLinksAppLauncher } from './deeplinks.launcher';
async function bootstrap() {
    
    ///////////////////////////////////////////////////////////////////////////

    const deepLinksApp = await NestFactory.create(DeepLinksAppModule, {});

    const dLConfigService = deepLinksApp.get(ConfigService);
    const dLLoggerService = deepLinksApp.get(Logger);

    const dLAppLauncher = new DeepLinksAppLauncher(deepLinksApp, dLConfigService, dLLoggerService);
    dLAppLauncher.setup();
    await dLAppLauncher.launch();
}
void bootstrap();
