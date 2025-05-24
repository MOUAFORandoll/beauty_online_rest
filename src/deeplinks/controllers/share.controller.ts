import { Controller, Get, Header, HttpCode, HttpStatus, Param } from '@nestjs/common';

import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { ShareData } from '../dto/types';
import * as path from 'node:path';
import * as process from 'node:process';
import { Public } from 'src/common/apiutils';
import { ProfileService } from 'src/app/profile_professionnels/providers';
import { ActuService } from 'src/app/actu/providers';

import {
    AgendaModel,
    RendezVousModel,
    RENDEZ_VOUS_MODEL_NAME,
    REALISATION_FILE_MODEL_NAME,
    RealisationFileModel,
    AGENDA_MODEL_NAME,
    REALISATION_MODEL_NAME,
    RealisationModel,
    DATABASE_CONNECTION,
    POSITION_MODEL_NAME,
    PositionModel,
    VUE_REALISATION_MODEL_NAME,
    VueRealisationModel,
    SHARE_REALISATION_MODEL_NAME,
    ShareRealisationModel,
    LIKE_REALISATION_MODEL_NAME,
    LikeRealisationModel,
} from 'src/databases/main.database.connection';
import { InjectModel } from '@nestjs/mongoose';
import { ActuResponseDto } from 'src/app/actu/dto/actu.response.dto';

@Controller()
export class ShareController {
    htmlContent: string;
    appName: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly profileService: ProfileService,
        @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
        private readonly realisationFileModel: RealisationFileModel,

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

        private readonly actuService: ActuService,
    ) {
        this.appName = this.configService.get('DEEPLINKS_APP_NAME');
        const shareTemplate = path.resolve(
            process.cwd(),
            './src/deeplinks/dto/share.template.html',
        );
        this.htmlContent = fs.readFileSync(shareTemplate, { encoding: 'utf-8' });
    }

    @Get('/professionnel/:id')
    @Public()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/html; charset=utf-8')
    async findOneProById(@Param('id') id: string): Promise<string> {
        const profile = await this.profileService.findOneById(id);
        return this.fillTemplate({
            pageTitle: this.appName,
            title: profile.namePro,
            description: profile.description,
            image: profile.cover,
        });
    }

    @Get('/actu/:id')
    @Public()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/html; charset=utf-8')
    async findOneActuById(@Param('id') id: string): Promise<string> {
        const actu = await this.actuService.findOneById(id);
        const actuFromDTP = ActuResponseDto.fromActu(
            actu,
null,
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
        return this.fillTemplate({
            pageTitle: this.appName,
            title: (await actuFromDTP).title,
            description:
                (await actuFromDTP).nombre_vues +
                'VueRealisations et ' +
                (await actuFromDTP).nombre_partages +
                'Partages',
            image:
                (await actuFromDTP).realisation_files[0] == null
                    ? ''
                    : (await actuFromDTP).realisation_files[0].file_path,
        });
    }

    private fillTemplate(data: ShareData): string {
        return this.htmlContent
            .replaceAll('{{pageTitle}}', data.pageTitle ?? '')
            .replaceAll('{{title}}', data.title ?? '')
            .replaceAll('{{description}}', data.description ?? '')
            .replaceAll('{{image}}', data.image ?? '')
            .replaceAll('{{imageHeight}}', data.imageHeight ?? '1200')
            .replaceAll('{{imageWidth}}', data.imageWidth ?? '630')
            .replaceAll('{{appName}}', this.appName ?? '')
            .replaceAll('{{sitename}}', this.appName ?? '')
            .replaceAll('{{appleAppId}}', this.configService.get('APPLE_APP_ID') ?? '')
            .replaceAll('{{googleAppId}}', this.configService.get('GOOGLE_APP_ID') ?? '')
            .replaceAll('{{site}}', this.configService.get('WEB_URL') ?? '');
    }
}
