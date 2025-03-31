import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
    Link,
    LINK_MODEL_NAME,
    LinkModel,
    MAIN_DATABASE_CONNECTION,
} from '../main/main.database.connection';
import { LinkErrorNotFound, LinkErrors } from '../../links/errors';

@Injectable()
export class LinksService {
    constructor(
        @InjectModel(LINK_MODEL_NAME, MAIN_DATABASE_CONNECTION)
        protected linkModel: LinkModel,
    ) {}

    async getLink(id: string): Promise<Link> {
        const link = await this.linkModel.findById(id).exec();
        if (!link) {
            throw new NotFoundException(LinkErrors[LinkErrorNotFound]);
        }
        return link;
    }
}