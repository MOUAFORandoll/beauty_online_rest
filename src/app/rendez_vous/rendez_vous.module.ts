import { Module } from '@nestjs/common';
import { RendezVousController } from './controllers';
import { RendezVousService } from './providers';
import { MainDatabaseModule } from '../../databases/main.database.module';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ExternalModule } from 'src/common/modules/external/external.module';
import { NotificationsModule } from 'src/common/modules/notifications/notifications.module';

@Module({
    imports: [MainDatabaseModule, ExternalModule, NotificationsModule],
    providers: [ProfileService, RendezVousService],
    controllers: [RendezVousController],
    exports: [ProfileService, RendezVousService],
})
export class RendezVousModule {}
