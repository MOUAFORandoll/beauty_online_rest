import { ConfigService } from '@nestjs/config';
export declare const WELL_KNOWN_CONTROLLER_NAME = ".well-known";
export declare class WellKnownController {
    private configService;
    assetLinksData: string;
    appleAppSiteAssociationLinksData: string;
    constructor(configService: ConfigService);
    assetLinks(): string;
    appleAppSiteAssociation(): string;
}
