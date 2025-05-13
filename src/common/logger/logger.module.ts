import { Logger, Module } from '@nestjs/common';
import HttpLoggerService from './providers/http_logger.service';
import { ConfigModule } from '@nestjs/config';
import { StringsHelperService } from './providers';

@Module({
    imports: [ConfigModule],
    providers: [HttpLoggerService, StringsHelperService, Logger],
    exports: [HttpLoggerService, StringsHelperService],
})
export class LoggerModule {}
