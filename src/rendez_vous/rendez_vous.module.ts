import { Module } from '@nestjs/common';
import { RendezVousController } from './controllers';
import { RendezVousService } from './providers';
import { MainDatabaseModule } from '../databases/main.database.module';
import { ProfileService } from 'src/profile_professionnels/providers';
import { AwsModule } from 'src/common/modules/aws/aws.module';
import { NotificationsModule } from 'src/common/modules/notifications/notifications.module';


@Module({
    imports: [MainDatabaseModule, AwsModule, NotificationsModule],
    providers: [ProfileService, RendezVousService],
    controllers: [RendezVousController],
    exports: [ProfileService, RendezVousService],
})
export class RendezVousModule {}
