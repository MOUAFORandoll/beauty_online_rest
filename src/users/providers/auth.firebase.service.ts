import { Injectable } from '@nestjs/common';
import { App, getApps } from 'firebase-admin/app';
import admin from 'firebase-admin';
import fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { getAuth } from 'firebase-admin/auth';
import { FirebaseVerificationDto } from '../dto';
import { FirebaseApp } from 'src/common/services/firebase';

@Injectable()
export class AuthFirebaseService {
    app: App;
    constructor(private configService: ConfigService) {
        this.init();
    }

    init() {
        if (getApps().length > 0) {
            this.app = getApps()[0];
            return;
        }

        const jsonData = fs.readFileSync(this.configService.get('FIREBASE_SECRET_PATH')).toString();
        const appName = this.configService.get('APP_NAME');
        const secret = JSON.parse(jsonData);
        this.app = admin.initializeApp(
            {
                credential: admin.credential.cert(secret),
            },
            appName,
        );
    }

    async verifyToken(token: string): Promise<FirebaseVerificationDto> {
        try {
            const decodedToken = await getAuth(this.app).verifyIdToken(token);
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                email_verified: decodedToken.email_verified,
                userFireBase: await getAuth(FirebaseApp).getUser(decodedToken.uid),
                authProvider: decodedToken.firebase.sign_in_provider,
            };
        } catch (error) {
            console.error('Token verification failed:', error);
            return {
                email_verified: false,
            };
        }
    }
}
