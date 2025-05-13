import { Module } from '@nestjs/common';
import { ActuController } from './controllers';
import { ActuService } from './providers';
import { MainDatabaseModule } from '../databases/main.database.module';
import { AwsModule } from 'src/common/modules/aws/aws.module';

@Module({
    imports: [MainDatabaseModule, AwsModule],
    providers: [ActuService],
    controllers: [ActuController],
    exports: [ActuService],
})
export class ActuModule {}
