import { Module } from '@nestjs/common';
import { ShareController, WellKnownController } from './controllers';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { MainDatabaseModule } from 'src/databases/main.database.module';
import { AwsModule } from '../common/modules/aws/aws.module';

@Module({
    imports: [MainDatabaseModule, AwsModule],
    providers: [ProfileService],
    controllers: [ShareController, WellKnownController],
    exports: [ProfileService],
})
export class DeepLinksModule {}
