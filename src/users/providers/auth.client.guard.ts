import { getAuth } from 'firebase-admin/auth';
import { InjectModel } from '@nestjs/mongoose';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseApp } from 'src/common/services/firebase';
import { Reflector } from '@nestjs/core';
import { checkIsPublic } from 'src/common/apiutils';
import {
    DATABASE_CONNECTION,
    USER_MODEL_NAME,
    UserModel,
} from '../../databases/main.database.connection';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthClientGuard implements CanActivate {
    constructor(
        @InjectModel(USER_MODEL_NAME, DATABASE_CONNECTION)
        private readonly user: UserModel,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const environment = this.configService.get<string>('ENVIRONMENT');

        return this.developmentCanActivate(context);
        // switch (environment) {
        //     case 'development':
        //         return this.developmentCanActivate(context);
        //     case 'production':
        //     case 'staging':
        //     default:
        //         return this.productionCanActivate(context);
        // }
    }

    async productionCanActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();

        const request = ctx.getRequest();
   

        const isPublic = checkIsPublic(this.reflector, context);
        if (isPublic) return true;

        const authHeader: string = request.headers.authorization;

        if (!authHeader) {
            return false;
        }
        const [bearer, token] = authHeader.split(' ');
        console.log(bearer, token);
        if (bearer !== 'Bearer' || !token) {
            return false;
        }
        if (!FirebaseApp) {
            return false;
        }

        const decodedToken = await getAuth(FirebaseApp).verifyIdToken(token);

        if (!decodedToken) {
            return false;
        }
        const user = await this.user.findOne({ firebaseUID: decodedToken.uid }).lean().exec();
        if (!user) return false;

        request['user'] = { id: user._id };

        return true;
    }

    async developmentCanActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        const isPublic = checkIsPublic(this.reflector, context);
        if (isPublic) return true;

        const userId = request.headers.uid;
        const user = await this.user.findById(userId).lean().exec();
        if (!user) return false;

        request['user'] = { id: user._id };

        return true;
    }
}
