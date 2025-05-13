import { Module } from '@nestjs/common';
import { ActuController } from './controllers';
import { ActuService } from './providers';
import { MainDatabaseModule } from '../databases/main.database.module';
import { AwsModule } from 'src/common/modules/aws/aws.module';
import { ProfileService } from 'src/profile_professionnels/providers';
import { ProfileController } from 'src/profile_professionnels/controllers';

@Module({
    imports: [MainDatabaseModule, AwsModule],
    providers: [ProfileService, ActuService],
    controllers: [ProfileController, ActuController],
    exports: [ProfileService, ActuService],
})
export class ActuModule {}
