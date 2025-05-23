import { Controller, Get, Header, HttpCode, HttpStatus } from '@nestjs/common';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/common/apiutils';

export const WELL_KNOWN_CONTROLLER_NAME = '.well-known';
@Controller(WELL_KNOWN_CONTROLLER_NAME)
export class WellKnownController {
    assetLinksData: string;
    appleAppSiteAssociationLinksData: string;

    constructor(private configService: ConfigService) {
        const assetLinksPath = this.configService.get('ASSETLINKS_PATH');
        this.assetLinksData = JSON.parse(fs.readFileSync(assetLinksPath).toString());

        const appleAppSiteAssociationPath = this.configService.get(
            'APPLE_APP_SITE_ASSOCIATION_PATH',
        );
        this.appleAppSiteAssociationLinksData = JSON.parse(
            fs.readFileSync(appleAppSiteAssociationPath).toString(),
        );
    }

    @Get('assetlinks.json')
    @Public()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    assetLinks() {
        return this.assetLinksData;
    }

    @Get('apple-app-site-association')
    @Public()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    appleAppSiteAssociation() {
        return this.appleAppSiteAssociationLinksData;
    }
}
