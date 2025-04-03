import { Module } from '@nestjs/common';
import { ProfileController, RealisationController } from './controllers';
import { AgendaService, ProfileService, RealisationService } from './providers';
import { MainDatabaseModule } from '../databases/main.database.module';
import { AgendaController } from './controllers/agenda.controller';

@Module({
    imports: [MainDatabaseModule],
    providers: [ProfileService, RealisationService, AgendaService],
    controllers: [ProfileController, RealisationController, AgendaController],
    exports: [ProfileService, RealisationService, AgendaService],
})
export class ProfileModule {}
