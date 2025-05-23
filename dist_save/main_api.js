"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_launcher_1 = require("./app.launcher");
const firebase_1 = require("./common/services/firebase");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const loggerService = app.get(common_1.Logger);
    const firebaseServiceAccountPath = configService.get('FIREBASE_SECRET_PATH');
    (0, firebase_1.InitFirebaseApp)(firebaseServiceAccountPath);
    const appLauncher = new app_launcher_1.AppLauncher(app, configService, loggerService);
    appLauncher.setup();
    await appLauncher.launch();
}
void bootstrap();
//# sourceMappingURL=main_api.js.map