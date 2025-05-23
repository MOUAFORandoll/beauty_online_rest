"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const deeplinks_app_module_1 = require("./deeplinks.app.module");
const deeplinks_launcher_1 = require("./deeplinks.launcher");
async function bootstrap() {
    const deepLinksApp = await core_1.NestFactory.create(deeplinks_app_module_1.DeepLinksAppModule, {});
    const dLConfigService = deepLinksApp.get(config_1.ConfigService);
    const dLLoggerService = deepLinksApp.get(common_1.Logger);
    const dLAppLauncher = new deeplinks_launcher_1.DeepLinksAppLauncher(deepLinksApp, dLConfigService, dLLoggerService);
    dLAppLauncher.setup();
    await dLAppLauncher.launch();
}
void bootstrap();
//# sourceMappingURL=main_deeplink.js.map