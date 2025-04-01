// import Path from 'path';
// import { Injectable } from '@nestjs/common';
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class StorageService {
//     private static usersProfilePicturesPath = 'users/profile';
//     private static linksSEOImagesPath = 'links/seo';

//     private readonly bucket: string;
//     private readonly cloudfrontUrl: string;
//     private readonly s3Client: S3Client;

//     constructor(private readonly configService: ConfigService) {
//         this.bucket = this.configService.get<string>('AWS_BUCKET');
//         this.cloudfrontUrl = this.configService.get<string>('AWS_CLOUDFRONT_URL');
//         this.s3Client = new S3Client({
//             credentials: {
//                 accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
//                 secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY_SECRET'),
//             },
//             region: this.configService.get<string>('AWS_REGION'),
//         });
//     }

//     private getUrl(path: string, key: string, height?: number, width?: number): string {
//         const params = {
//             bucket: this.bucket,
//             key: Path.join(path, key),
//             edits: {
//                 resize: {
//                     fit: 'cover',
//                 },
//             },
//         };

//         if (height) params.edits.resize['height'] = height;
//         if (width) params.edits.resize['width'] = width;

//         return (
//             this.cloudfrontUrl +
//             `${this.cloudfrontUrl.endsWith('/') ? '' : '/'}` +
//             btoa(JSON.stringify(params))
//         );
//     }

//     private getKey(url: string): string {
//         const data = url.substring(url.lastIndexOf('/') + 1);
//         const decrypted = JSON.parse(atob(data));
//         const fullKey = decrypted['key'] as string;

//         return fullKey.substring(fullKey.lastIndexOf('/') + 1);
//     }

//     private async upload(path: string, key: string, media: Express.Multer.File): Promise<void> {
//         const command = new PutObjectCommand({
//             Bucket: this.bucket,
//             Key: Path.join(path, key),
//             Body: media.buffer,
//             ContentType: media.mimetype,
//         });

//         await this.s3Client.send(command);
//     }

//     private async uploadBuffer(path: string, key: string, media: Buffer): Promise<void> {
//         const command = new PutObjectCommand({
//             Bucket: this.bucket,
//             Key: Path.join(path, key),
//             Body: media,
//         });

//         await this.s3Client.send(command);
//     }

//     public async uploadUserProfile(image: Buffer, key: string): Promise<string> {
//         await this.uploadBuffer(StorageService.usersProfilePicturesPath, key, image);
//         return this.getUrl(StorageService.usersProfilePicturesPath, key);
//     }

//     public async uploadLinkImage(image: Express.Multer.File, key: string): Promise<string> {
//         await this.upload(StorageService.linksSEOImagesPath, key, image);
//         return this.getUrl(StorageService.linksSEOImagesPath, key, 600, 600);
//     }
// }
