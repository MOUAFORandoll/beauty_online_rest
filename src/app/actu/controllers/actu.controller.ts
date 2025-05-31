// profile.controller.ts
import {
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    Res,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
    Req,
} from '@nestjs/common';
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

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

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
                        description:
                            (dto.nombre_likes > 0
                                ? `${dto.nombre_likes} appréciation${dto.nombre_likes > 1 ? 's' : ''} • `
                                : '') +
                            (dto.nombre_vues > 0
                                ? `${dto.nombre_vues} vue${dto.nombre_vues > 1 ? 's' : ''} • `
                                : '') +
                            (dto.nombre_partages > 0
                                ? `${dto.nombre_partages} partage${dto.nombre_partages > 1 ? 's' : ''}`
                                : ''),

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
                    return {
                        type: 'pro',
                        title: dto.name_pro,

                        description: `${dto.service}${dto.nombre_catalogue > 0 ? `${dto.nombre_catalogue} catalogue${dto.nombre_catalogue > 1 ? 's' : ''}` : ''}${dto.nombre_catalogue > 0 && dto.nombre_reservation > 0 ? ' • ' : ''}${dto.nombre_reservation > 0 ? `${dto.nombre_reservation} rendez-vous effectué${dto.nombre_reservation > 1 ? 's' : ''}` : ''}`,
                        url: dto.cover,
                        data: dto,
                    };
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
    @HttpCode(HttpStatus.OK)
    @Get(':id/stream')
    @Public()
    async stream(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        try {
            // Validation de l'ID
            if (!id || id.trim() === '') {
                throw new BadRequestException('ID invalide');
            }

            // Récupération des informations vidéo
            const video = await this.actuService.findOneRealisationFileById(id);
            if (!video) {
                throw new NotFoundException('Vidéo non trouvée');
            }

            // Validation et sécurisation du chemin de fichier
            const sanitizedPath = path.normalize(video.file_path).replace(/^(\.\.[/\\])+/, '');
            const filePath = path.join('./assets/videos', sanitizedPath);

            // Vérification de l'existence et récupération des stats du fichier
            let fileStats;
            try {
                fileStats = await fs.promises.stat(filePath);
            } catch (error) {
                console.log(`Fichier non trouvé: ${filePath}`, error);
                throw new NotFoundException('Fichier vidéo non trouvé');
            }

            // Calcul optimisé de l'ETag basé sur les métadonnées du fichier
            const etag = crypto
                .createHash('md5')
                .update(`${fileStats.size}-${fileStats.mtime.getTime()}`)
                .digest('hex');

            // Gestion du cache avec If-None-Match
            const ifNoneMatch = req.headers['if-none-match'];
            if (ifNoneMatch === etag) {
                return res.status(HttpStatus.NOT_MODIFIED).end();
            }

            // Configuration des headers de base
            const baseHeaders = {
                'Content-Type': 'video/mp4',
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=3600',
                ETag: etag,
                'Last-Modified': fileStats.mtime.toUTCString(),
                // Headers CORS plus sécurisés
                'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
                'Access-Control-Allow-Headers': 'Range, If-None-Match',
                'Access-Control-Expose-Headers': 'Content-Range, Content-Length',
            };
            console.log('baseHeaders=========', baseHeaders);
            const range = req.headers.range;
            console.log('range=========',range);

            if (range) {
                // Gestion des Range Requests pour le streaming partiel
                this.handleRangeRequest(res, filePath, fileStats, range, baseHeaders);
            } else {
                // Streaming complet du fichier
                this.handleFullFileStream(res, filePath, fileStats, baseHeaders);
            }
        } catch (error) {
            console.log('Erreur lors du streaming:', error);

            if (!res.headersSent) {
                if (error instanceof BadRequestException || error instanceof NotFoundException) {
                    return res.status(error.getStatus()).json({
                        success: false,
                        error: error.message,
                    });
                }

                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    error: 'Erreur lors du streaming',
                    details: process.env.NODE_ENV !== 'production' ? error.message : undefined,
                });
            }
        }
    }

    private handleRangeRequest(
        res: Response,
        filePath: string,
        fileStats: fs.Stats,
        range: string,
        baseHeaders: Record<string, string>,
    ) {
        // Parse du header Range
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;

        // Validation des ranges
        if (isNaN(start) || isNaN(end) || start < 0 || end >= fileStats.size || start > end) {
            console.log(`Range invalide: ${range} pour fichier de taille ${fileStats.size}`);
            return res
                .status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                .set('Content-Range', `bytes */${fileStats.size}`)
                .json({
                    success: false,
                    error: 'Range non satisfiable',
                });
        }

        const chunkSize = end - start + 1;

        // Headers pour la réponse partielle
        const rangeHeaders = {
            ...baseHeaders,
            'Content-Range': `bytes ${start}-${end}/${fileStats.size}`,
            'Content-Length': chunkSize.toString(),
        };

        res.writeHead(HttpStatus.PARTIAL_CONTENT, rangeHeaders);

        // Création et gestion du stream
        const fileStream = fs.createReadStream(filePath, { start, end });

        fileStream.on('error', (error) => {
            console.log('Erreur stream fichier (range):', error);
            if (!res.destroyed) {
                res.destroy();
            }
        });

        fileStream.on('end', () => {
            console.log(`Stream range terminé: ${start}-${end}`);
        });

        fileStream.pipe(res);
    }

    private handleFullFileStream(
        res: Response,
        filePath: string,
        fileStats: fs.Stats,
        baseHeaders: Record<string, string>,
    ) {
        // Headers pour le fichier complet
        const fullHeaders = {
            ...baseHeaders,
            'Content-Length': fileStats.size.toString(),
        };

        res.writeHead(HttpStatus.OK, fullHeaders);

        // Création et gestion du stream
        const fileStream = fs.createReadStream(filePath);

        fileStream.on('error', (error) => {
            console.log('Erreur stream fichier complet:', error);
            if (!res.destroyed) {
                res.destroy();
            }
        });

        fileStream.on('end', () => {
            console.log('Stream complet terminé');
        });

        fileStream.pipe(res);
    }
}
