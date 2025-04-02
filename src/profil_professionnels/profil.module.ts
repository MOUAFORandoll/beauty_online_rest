import { Module } from '@nestjs/common';
import { ProfilController } from './controllers';
import { ProfilService } from './providers';
import { APP_GUARD } from '@nestjs/core';
import { MainDatabaseModule } from '../databases/main.database.module';

@Module({
    imports: [MainDatabaseModule],
    providers: [ProfilService],
    controllers: [ProfilController],
    exports: [ProfilService],
})
export class ProfilModule {}
