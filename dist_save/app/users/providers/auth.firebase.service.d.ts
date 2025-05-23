import { App } from 'firebase-admin/app';
import { ConfigService } from '@nestjs/config';
import { FirebaseVerificationDto } from '../dto';
export declare class AuthFirebaseService {
    private configService;
    app: App;
    constructor(configService: ConfigService);
    init(): void;
    verifyToken(token: string): Promise<FirebaseVerificationDto>;
}
