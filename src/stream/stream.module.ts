import { Module } from '@nestjs/common'; 
import { ActuService } from 'src/app/actu/providers';
import { StreamController } from './controllers/stream.controller';
import { MainDatabaseModule } from 'src/databases/main.database.module';

@Module({
    imports: [MainDatabaseModule],
    providers: [ActuService],
    controllers: [StreamController],
    exports: [ActuService],
})
export class StreamModule {}
