import { Module } from '@nestjs/common';
import { ActuController } from './controllers';
import { ActuService } from './providers';
import { MainDatabaseModule } from '../../databases/main.database.module';
import { ExternalModule } from 'src/common/modules/external/external.module';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ProfileController } from 'src/app/profile_professionnels/controllers';

@Module({
    imports: [MainDatabaseModule, ExternalModule],
    providers: [ProfileService, ActuService],
    controllers: [ProfileController, ActuController],
    exports: [ProfileService, ActuService],
})
export class ActuModule {}
