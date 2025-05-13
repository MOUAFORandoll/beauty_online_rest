// profile.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import {  ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RealisationResponseDto } from '../dto';
import { ActuService } from '../providers';
import * as Database from '../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto, Public } from 'src/common/apiutils';

import { REALISATION_FILE_MODEL_NAME, RealisationFileModel } from 'src/databases/services/entities';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';

@ApiTags('Actu')
@Controller('actu')
export class ActuController {
    constructor(
        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,
        private readonly actuService: ActuService,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Get('')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @ApiOkResponse({ type: PaginationPayloadDto })
    @Public()
    async findAll(
        @Query() pagination: PaginationPayloadDto,
    ): Promise<PaginationResponseDto<RealisationResponseDto>> {
        const { data, total } = await this.actuService.findAll(pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            RealisationResponseDto.fromRealisation(l, this.realisationFileModel),
        );
    }
}
