import { Module } from '@nestjs/common';
import { EmailService, StorageService } from './providers';

@Module({
    imports: [],
    providers: [StorageService, EmailService],
    exports: [StorageService, EmailService],
})
export class AwsModule {}
