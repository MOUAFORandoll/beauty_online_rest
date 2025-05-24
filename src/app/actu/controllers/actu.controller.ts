// profile.controller.ts
import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
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
    VUE_MODEL_NAME,
    VueModel,
    SHARE_MODEL_NAME,
    ShareModel,
} from 'src/databases/services/entities';
import {
    DATABASE_CONNECTION,
    POSITION_MODEL_NAME,
    PositionModel,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ShareLink } from 'src/common/ClassActions/response.dto';
import { GetUser } from 'src/app/users/decorators';

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
        @InjectModel(VUE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly vueModel: VueModel,
        @InjectModel(SHARE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly shareModel: ShareModel,

        private readonly profileService: ProfileService,
        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Get()
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
                this.vueModel,
                this.shareModel,
                this.profileService,
            ),
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Find actu by id',
    })
    @Public()
    @ApiOkResponse({ type: ActuResponseDto })
    async findOneById(@Param('id') id: string): Promise<ActuResponseDto> {
        const actu = await this.actuService.findOneById(id);
        return ActuResponseDto.fromActu(
            actu,
            this.realisationFileModel,
            this.agendaModel,
            this.positionModel,
            this.realisationModel,
            this.rendezVousModel,
            this.vueModel,
            this.shareModel,
            this.profileService,
        );
    }
    @Get(':id/share')
    @ApiOkResponse({ type: ShareLink })
    @ApiOperation({
        summary: 'Actu Share link',
    })
    @HttpCode(HttpStatus.OK)
    async shareActu(
        @Param('id') actuId: string,
        @GetUser('id') userId: string,
    ): Promise<ShareLink> {
        console.log(actuId, userId);
        const shareLink = await this.actuService.shareActu(actuId, userId);
        return { shareLink };
    }
    @Get(':id/vue')
    @ApiOperation({
        summary: 'Actu Share link',
    })
    @HttpCode(HttpStatus.OK)
    vueActu(
        @Param('id') actuId: string,

        @GetUser('id') userId: string,
    ): void {
        console.log(actuId, userId);
        this.actuService.vueActu(actuId, userId);
    }
}
