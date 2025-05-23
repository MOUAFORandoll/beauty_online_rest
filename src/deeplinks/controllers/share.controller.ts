import { Controller, Get, Header, HttpCode, HttpStatus, Param } from '@nestjs/common';

import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { ShareData } from '../dto/types';
import * as path from 'node:path';
import * as process from 'node:process';
import { Public } from 'src/common/apiutils';
import { ProfileService } from 'src/app/profile_professionnels/providers';

@Controller()
export class ShareController {
    htmlContent: string;
    appName: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly profileService: ProfileService,
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
    async findOneById(@Param('id') id: string): Promise<string> {
        const profile = await this.profileService.findOneById(id);
        return this.fillTemplate({
            pageTitle: this.appName,
            title: profile.namePro,
            description: profile.description,
            image: profile.cover,
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
