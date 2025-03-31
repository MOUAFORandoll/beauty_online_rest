import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
    MAIN_DATABASE_CONNECTION,
    Platform,
    PlatformModel,
    PLATFORM_MODEL_NAME,
} from '../main/main.database.connection';
import {
    PlatformErrorNotFound,
    PlatformErrors,
} from '../../applications/errors/platform.errors';

@Injectable()
export class PlatformsService {
    constructor(
        @InjectModel(PLATFORM_MODEL_NAME, MAIN_DATABASE_CONNECTION)
        protected platformModel: PlatformModel,
    ) {}

    async getPlatform(id: string): Promise<Platform> {
        const platformData = await this.platformModel.findById(id).exec();
        if (!platformData) {
            throw new NotFoundException(PlatformErrors[PlatformErrorNotFound]);
        }
        return platformData;
    }
}