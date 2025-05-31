import { Module } from '@nestjs/common';
import { ShareController, WellKnownController } from './controllers';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { MainDatabaseModule } from 'src/databases/main.database.module';
import { ExternalModule } from '../common/modules/external/external.module';
import { ActuService } from 'src/app/actu/providers';

@Module({
    imports: [MainDatabaseModule, ExternalModule],
    providers: [ProfileService, ActuService],
    controllers: [ShareController, WellKnownController],
    exports: [ProfileService, ActuService],
})
export class DeepLinksModule {}
