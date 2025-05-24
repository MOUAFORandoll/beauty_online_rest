import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly configService;
    private static userProfilePath;
    private static professionalCoverPath;
    private static professionalRealisationPath;
    private readonly bucket;
    private readonly cloudfrontUrl;
    private readonly s3Client;
    constructor(configService: ConfigService);
    private getUrl;
    private getKey;
    private upload;
    private uploadBuffer;
    uploadCoverImage(image: Express.Multer.File, key: string): Promise<string>;
    userProfilePath(image: Express.Multer.File, key: string): Promise<string>;
    uploadRealisationImage(image: Express.Multer.File, key: string): Promise<string>;
}
