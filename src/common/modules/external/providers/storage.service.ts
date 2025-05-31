import Path from 'path';
import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname, join } from 'path';
import { promises as fs } from 'fs';
export interface UploadedFileInfo {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
}

@Injectable()
export class StorageService {
    private static userProfilePath = 'users/profile';
    private static professionalCoverPath = 'professional/cover';
    private static professionalRealisationPath = 'professional/realisation';
    private readonly videoDir = './assets/videos';

    private readonly bucket: string;
    private readonly cloudfrontUrl: string;
    private readonly s3Client: S3Client;
    constructor(private readonly configService: ConfigService) {
        this.bucket = this.configService.get<string>('AWS_BUCKET');
        this.cloudfrontUrl = this.configService.get<string>('AWS_CLOUDFRONT_URL');
        this.s3Client = new S3Client({
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_ACCESS_KEY_SECRET'),
            },
            region: this.configService.get<string>('AWS_REGION'),
        });
    }

    private getUrl(path: string, key: string, height?: number, width?: number): string {
        const params = {
            bucket: this.bucket,
            key: Path.join(path, key),
            edits: {
                resize: {
                    fit: 'cover',
                },
            },
        };

        if (height) params.edits.resize['height'] = height;
        if (width) params.edits.resize['width'] = width;

        return (
            this.cloudfrontUrl +
            `${this.cloudfrontUrl.endsWith('/') ? '' : '/'}` +
            btoa(JSON.stringify(params))
        );
    }

    private getKey(url: string): string {
        const data = url.substring(url.lastIndexOf('/') + 1);
        const decrypted = JSON.parse(atob(data));
        const fullKey = decrypted['key'] as string;

        return fullKey.substring(fullKey.lastIndexOf('/') + 1);
    }

    private async upload(path: string, key: string, media: Express.Multer.File): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: Path.join(path, key),
            Body: media.buffer,
            ContentType: media.mimetype,
        });

        await this.s3Client.send(command);
    }

    private async uploadBuffer(path: string, key: string, media: Buffer): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: Path.join(path, key),
            Body: media,
        });

        await this.s3Client.send(command);
    }
    public async uploadCoverImage(image: Express.Multer.File, key: string): Promise<string> {
        try {
            const uploadKey = key + Date.now().toString();
            await this.upload(StorageService.professionalCoverPath, uploadKey, image);
            return this.getUrl(StorageService.professionalCoverPath, uploadKey, 600, 600);
        } catch (error) {
            console.error('Error uploading cover image:', error);
            throw error; // Rethrow the error to allow it to be handled by the caller
        }
    }

    public async userProfilePath(image: Express.Multer.File, key: string): Promise<string> {
        try {
            const uploadKey = key + Date.now().toString();
            await this.upload(StorageService.userProfilePath, uploadKey, image);
            return this.getUrl(StorageService.userProfilePath, uploadKey, 600, 600);
        } catch (error) {
            console.log('=========', error);
        }
    }
    public async uploadRealisationImage(image: Express.Multer.File, key: string): Promise<string> {
        try {
            const uploadKey = key + Date.now().toString();
            await this.upload(
                StorageService.professionalRealisationPath + '/images',
                uploadKey,
                image,
            );
            return this.getUrl(
                StorageService.professionalRealisationPath + '/images',
                uploadKey,
                600,
                600,
            );
        } catch (error) {
            console.log('=========', error);
        }
    }
    public async uploadRealisationVideo(video: Express.Multer.File, key: string): Promise<string> {
        try {
            const uploadKey = key + Date.now().toString();
            const uploadedFile = await this.uploadToLocal(video, this.videoDir, uploadKey);
            console.log(uploadedFile.path);
            return uploadedFile.filename;
        } catch (error) {
            console.log('=========', error);
        }
    }

    async uploadToLocal(
        file: Express.Multer.File,
        dir: string,
        key: string,
    ): Promise<UploadedFileInfo> {
        const ext = extname(file.originalname);

        const newFilename = `${key}${ext}`;
        const destinationPath = join(dir, newFilename);

        await fs.rename(file.path, destinationPath);

        return {
            filename: newFilename,
            path: destinationPath,
            mimetype: file.mimetype,
            size: file.size,
        };
    }
}
