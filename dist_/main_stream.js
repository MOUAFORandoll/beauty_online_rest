"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const stream_app_module_1 = require("./stream.app.module");
const stream_launcher_1 = require("./stream.launcher");
async function bootstrap() {
    const streamApp = await core_1.NestFactory.create(stream_app_module_1.StreamAppModule, {});
    const streamConfigService = streamApp.get(config_1.ConfigService);
    const streamLoggerService = streamApp.get(common_1.Logger);
    const streamAppLauncher = new stream_launcher_1.StreamAppLauncher(streamApp, streamConfigService, streamLoggerService);
    streamAppLauncher.setup();
    await streamAppLauncher.launch();
}
void bootstrap();
//# sourceMappingURL=main_stream.js.map