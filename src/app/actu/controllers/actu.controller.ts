// profile.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActuResponseDto } from '../dto';
import { ActuService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto, Public } from 'src/common/apiutils';

import {
    AgendaModel,
    RendezVousModel,
    RENDEZ_VOUS_MODEL_NAME,
    REALISATION_FILE_MODEL_NAME,
    RealisationFileModel,
    AGENDA_MODEL_NAME,
    REALISATION_MODEL_NAME,
    RealisationModel,
} from 'src/databases/services/entities';
import {
    DATABASE_CONNECTION,
    POSITION_MODEL_NAME,
    PositionModel,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileService } from 'src/app/profile_professionnels/providers';

@ApiTags('Actus')
@Controller('actus')
export class ActuController {
    constructor(
        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,
        private readonly actuService: ActuService,
        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,

        @InjectModel(POSITION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly positionModel: PositionModel,

        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,

        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,

        private readonly profileService: ProfileService,
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
    ): Promise<PaginationResponseDto<ActuResponseDto>> {
        const { data, total } = await this.actuService.findAll(pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            ActuResponseDto.fromActu(
                l,

                this.realisationFileModel,
                this.agendaModel,
                this.positionModel,
                this.realisationModel,

                this.rendezVousModel,
                this.profileService,
            ),
        );
    }
}
