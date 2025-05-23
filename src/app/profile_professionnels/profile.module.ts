import { Module } from '@nestjs/common';
import { ProfileController, RealisationController } from './controllers';
import { AgendaService, ProfileService, RealisationService } from './providers';
import { MainDatabaseModule } from '../../databases/main.database.module';
import { AgendaController } from './controllers/agenda.controller';
import { AwsModule } from 'src/common/modules/aws/aws.module';

@Module({
    imports: [MainDatabaseModule, AwsModule],
    providers: [ProfileService, RealisationService, AgendaService],
    controllers: [ProfileController, RealisationController, AgendaController],
    exports: [ProfileService, RealisationService, AgendaService],
})
export class ProfileModule {}
