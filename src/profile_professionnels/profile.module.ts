import { Module } from '@nestjs/common';
import { ProfileController, RealisationController } from './controllers';
import { ProfileService, RealisationService } from './providers';
import { MainDatabaseModule } from '../databases/main.database.module';

@Module({
    imports: [MainDatabaseModule],
    providers: [ProfileService, RealisationService],
    controllers: [ProfileController, RealisationController],
    exports: [ProfileService, RealisationService],
})
export class ProfileModule {}
