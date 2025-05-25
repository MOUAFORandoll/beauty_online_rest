// profile.controller.ts
import { Controller, Get, Post, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActuResponseDto } from '../dto';
import { ActuService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';

import {
    AgendaModel,
    RendezVousModel,
    RENDEZ_VOUS_MODEL_NAME,
    REALISATION_FILE_MODEL_NAME,
    RealisationFileModel,
    AGENDA_MODEL_NAME,
    REALISATION_MODEL_NAME,
    RealisationModel,
    VUE_REALISATION_MODEL_NAME,
    VueRealisationModel,
    SHARE_REALISATION_MODEL_NAME,
    ShareRealisationModel,
    LIKE_REALISATION_MODEL_NAME,
    LikeRealisationModel,
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
import { SearchResponseDto } from '../dto/search.response.dto';
import { ProfileResponseDto } from 'src/app/profile_professionnels/dto';

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
        @InjectModel(VUE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly vueModel: VueRealisationModel,
        @InjectModel(SHARE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly shareModel: ShareRealisationModel,
        @InjectModel(LIKE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly likeModel: LikeRealisationModel,

        private readonly profileService: ProfileService,

        private readonly dbUsersService: Database.UsersService,
    ) {}

    @Get('')
    @ApiOperation({
        summary: 'Find All profile',
    })
    @ApiOkResponse({ type: PaginationPayloadDto })
    async findAll(
        @Query() pagination: PaginationPayloadDto,
        @GetUser('id') userId: string,
    ): Promise<PaginationResponseDto<ActuResponseDto>> {
        console.log(userId);
        const { data, total } = await this.actuService.findAll(pagination);

        return PaginationResponseDto.responseDto(pagination, data, total).mapPromise((l) =>
            ActuResponseDto.fromActu(
                l,
                userId,
                this.realisationFileModel,
                this.agendaModel,
                this.positionModel,
                this.realisationModel,
                this.rendezVousModel,
                this.vueModel,
                this.shareModel,
                this.likeModel,
                this.profileService,
            ),
        );
    }
    @Get('/search')
    @ApiOkResponse({ type: PaginationResponseDto<SearchResponseDto> })
    @HttpCode(HttpStatus.OK)
    async searchData(
        @Query('search') search: string,
        @Query() pagination: PaginationPayloadDto,
        @GetUser('id') userId: string,
    ): Promise<PaginationResponseDto<SearchResponseDto>> {
        console.log(search);
        // 1. Récupère en une seule fois tous les items
        const { total, realisations, profiles } = await this.actuService.searchData(search);

        // 2. Construit un tableau unifié de "raw results" avec type marker
        type RawItem = { type: 'actu'; data: any } | { type: 'pro'; data: any };
        const allItems: RawItem[] = [
            ...realisations.map((r) => ({ type: 'actu' as const, data: r })),
            ...profiles.map((p) => ({ type: 'pro' as const, data: p })),
        ];

        // 4. Détermine les indices de slice
        const start = (pagination.page - 1) * pagination.size;
        const end = start + pagination.size;

        // 5. Prend uniquement la page courante
        const pageItems = allItems.slice(start, end);

        // 6. Mappe chaque raw item vers son DTO
        const results: SearchResponseDto[] = await Promise.all(
            pageItems.map(async (item) => {
                if (item.type === 'actu') {
                    const dto = await ActuResponseDto.fromActu(
                        item.data,
                        userId,
                        this.realisationFileModel,
                        this.agendaModel,
                        this.positionModel,
                        this.realisationModel,
                        this.rendezVousModel,
                        this.vueModel,
                        this.shareModel,
                        this.likeModel,
                        this.profileService,
                    );
                    return {
                        type: 'actu',
                        title: dto.title,
                        url: dto.realisation_files[0].file_path,
                        data: dto,
                    };
                } else {
                    const dto = await ProfileResponseDto.fromProfile(
                        item.data,
                        this.agendaModel,
                        this.positionModel,
                        this.realisationModel,
                        this.rendezVousModel,
                    );
                    return { type: 'pro', title: dto.name_pro, url: dto.cover, data: dto };
                }
            }),
        );

        // 7. Retourne la structure paginée
        return PaginationResponseDto.responseDto(pagination, results, total);
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Find actu by id',
    })
    @ApiOkResponse({ type: ActuResponseDto })
    async findOneById(
        @Param('id') id: string,
        @GetUser('id') userId: string,
    ): Promise<ActuResponseDto> {
        const actu = await this.actuService.findOneById(id);
        return ActuResponseDto.fromActu(
            actu,
            userId,
            this.realisationFileModel,
            this.agendaModel,
            this.positionModel,
            this.realisationModel,
            this.rendezVousModel,
            this.vueModel,
            this.shareModel,
            this.likeModel,
            this.profileService,
        );
    }
    @Get(':id/share')
    @ApiOkResponse({ type: ShareLink })
    @ApiOperation({
        summary: 'Actu Share  link',
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
        summary: 'Actu Share  link',
    })
    @HttpCode(HttpStatus.OK)
    vueActu(
        @Param('id') actuId: string,

        @GetUser('id') userId: string,
    ): void {
        console.log(actuId, userId);
        this.actuService.vueActu(actuId, userId);
    }
    @HttpCode(HttpStatus.OK)
    @Post(':id/like')
    like(@Param('id') id: string, @GetUser('id') userId: string) {
        return this.actuService.likeRealisation(userId, id);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id/likes')
    getLikeCount(@Param('id') id: string) {
        return this.actuService.countLikes(id);
    }
}
