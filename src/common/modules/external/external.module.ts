import { Module } from '@nestjs/common';
import { EmailService, StorageService } from './providers';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: config.get('MAIL_USER'),
                        pass: config.get('MAIL_PASS'),
                    },
                },
                defaults: {
                    from: `"${config.get('MAIL_FROM_NAME')}" <${config.get('MAIL_USER')}>`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [StorageService, EmailService],
    exports: [StorageService, EmailService],
})
export class ExternalModule {}
