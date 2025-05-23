import { Module } from '@nestjs/common';
import { ShareController, WellKnownController } from './controllers';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { MainDatabaseModule } from 'src/databases/main.database.module';
import { AwsModule } from '../common/modules/aws/aws.module';
import { ActuService } from 'src/app/actu/providers';

@Module({
    imports: [MainDatabaseModule, AwsModule],
    providers: [ProfileService, ActuService],
    controllers: [ShareController, WellKnownController],
    exports: [ProfileService, ActuService],
})
export class DeepLinksModule {}
