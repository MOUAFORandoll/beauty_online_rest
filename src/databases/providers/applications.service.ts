import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MAIN_DATABASE_CONNECTION } from '../main/main.database.connection';
import { Application, APPLICATION_MODEL_NAME, ApplicationModel } from '../entities';
import {
    ApplicationErrorNotAuthorized,
    ApplicationErrorNotFound,
    ApplicationErrors,
} from '../../applications/errors';
import { idEquals } from '../main/base.functions';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectModel(APPLICATION_MODEL_NAME, MAIN_DATABASE_CONNECTION)
        protected applicationModel: ApplicationModel,
    ) {}

    async getApplication(id: string): Promise<Application> {
        const application = await this.applicationModel.findOne({ _id: id }).exec();

        if (application == null)
            throw new NotFoundException(ApplicationErrors[ApplicationErrorNotFound]);
        return application;
    }

    async getApplicationWithOwner(id: string, userId: string): Promise<Application> {
        const application = await this.getApplication(id);

        if (!idEquals(application.user_id, userId))
            throw new NotFoundException(ApplicationErrors[ApplicationErrorNotAuthorized]);

        return application;
    }
}