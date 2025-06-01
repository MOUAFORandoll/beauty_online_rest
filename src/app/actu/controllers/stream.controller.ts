// profile.controller.ts
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Res,
    BadRequestException,
    NotFoundException,
    Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActuService } from '../providers';
import { Public } from 'src/common/apiutils';

import {
    RendezVousModel,
    RENDEZ_VOUS_MODEL_NAME,
    REALISATION_MODEL_NAME,
    RealisationModel,
    VUE_REALISATION_MODEL_NAME,
    VueRealisationModel,
    SHARE_REALISATION_MODEL_NAME,
    ShareRealisationModel,
    LIKE_REALISATION_MODEL_NAME,
    LikeRealisationModel,
    REALISATION_VIDEO_MODEL_NAME,
    RealisationVideoModel,
} from 'src/databases/services/entities';
import {
    DATABASE_CONNECTION,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileService } from 'src/app/profile_professionnels/providers';

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@ApiTags('Stream')
@Controller('stream')
export class StreamController {
    constructor(
        private readonly actuService: ActuService,

        @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationModel: RealisationModel,
        @InjectModel(REALISATION_VIDEO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationVideoModel: RealisationVideoModel,

        @InjectModel(RENDEZ_VOUS_MODEL_NAME, DATABASE_CONNECTION)
        private readonly rendezVousModel: RendezVousModel,
        @InjectModel(VUE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly vueModel: VueRealisationModel,
        @InjectModel(SHARE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly shareModel: ShareRealisationModel,
        @InjectModel(LIKE_REALISATION_MODEL_NAME, DATABASE_CONNECTION)
        private readonly likeModel: LikeRealisationModel,

        private readonly profileService: ProfileService,
        private configService: ConfigService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @Public()
    async stream(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        try {
            // Validation de l'ID
            if (!id || id.trim() === '') {
                throw new BadRequestException('ID invalide');
            }

            // Récupération des informations vidéo
            const video = await this.actuService.findOneRealisationVideoById(id);
            if (!video) {
                throw new NotFoundException('Vidéo non trouvée');
            }

            // Validation et sécurisation du chemin de fichier
            const sanitizedPath = path.normalize(video.video_path).replace(/^(\.\.[/\\])+/, '');
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
            console.log('range=========', range);

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
