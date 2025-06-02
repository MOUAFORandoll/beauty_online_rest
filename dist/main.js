"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_launcher_1 = require("./app.launcher");
const firebase_1 = require("./common/services/firebase");
const deeplinks_app_module_1 = require("./deeplinks.app.module");
const deeplinks_launcher_1 = require("./deeplinks.launcher");
const path_1 = require("path");
async function bootstrap() {
    await bootstrapRestApp();
    await bootstrapRedirectLink();
}
async function bootstrapRestApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'assets'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'assets/videos'));
    const configService = app.get(config_1.ConfigService);
    const loggerService = app.get(common_1.Logger);
    const firebaseServiceAccountPath = configService.get('FIREBASE_SECRET_PATH');
    (0, firebase_1.InitFirebaseApp)(firebaseServiceAccountPath);
    const appLauncher = new app_launcher_1.AppLauncher(app, configService, loggerService);
    appLauncher.setup();
    await appLauncher.launch();
}
async function bootstrapRedirectLink() {
    const deepLinksApp = await core_1.NestFactory.create(deeplinks_app_module_1.DeepLinksAppModule, {});
    const dLConfigService = deepLinksApp.get(config_1.ConfigService);
    const dLLoggerService = deepLinksApp.get(common_1.Logger);
    const dLAppLauncher = new deeplinks_launcher_1.DeepLinksAppLauncher(deepLinksApp, dLConfigService, dLLoggerService);
    dLAppLauncher.setup();
    await dLAppLauncher.launch();
}
void bootstrap();
//# sourceMappingURL=main.js.map