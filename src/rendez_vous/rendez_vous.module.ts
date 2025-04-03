import { Module } from '@nestjs/common';
import { RendezVousController } from './controllers';
import { RendezVousService } from './providers';
import { MainDatabaseModule } from '../databases/main.database.module';
@Module({
    imports: [MainDatabaseModule],
    providers: [RendezVousService],
    controllers: [RendezVousController],
    exports: [RendezVousService],
})
export class RendezVousModule {}
