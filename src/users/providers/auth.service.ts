import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthFirebaseService } from './auth.firebase.service';
import { FirebaseVerificationDto, UserAuthenticationDto } from '../dto';
import { FIREBASE_AUTH_FAILED, USER_EMAIL_ALREADY_EXISTS, UserErrors } from '../errors';
import { UserRecord } from 'firebase-admin/auth';
import { AppInternalServerError } from 'src/common/errors/internal';
import { FirebaseApp } from 'src/common/services/firebase';
import {
    MAIN_DATABASE_CONNECTION,
    User,
    USER_MODEL_NAME,
    UserModel,
} from '../../databases/main/main.database.connection';
import { StorageService } from '../../common/modules/aws/providers';
import axios from 'axios';
import { SubscriptionService } from '../../subscriptions/providers';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(USER_MODEL_NAME, MAIN_DATABASE_CONNECTION)
        private userModel: UserModel,
        private firebaseAuthService: AuthFirebaseService,
        private readonly storageService: StorageService,
        private readonly subscriptionService: SubscriptionService
    ) {}

    async authentication(payload: UserAuthenticationDto): Promise<User> {
        if (!FirebaseApp)
            throw new AppInternalServerError('[FIREBASE] Firebase app not initialized');
        const { token } = payload;

        const { email, authProvider, userFireBase, uid }: FirebaseVerificationDto =
            await this.firebaseAuthService.verifyToken(token);

        if (!email) {
            throw new ForbiddenException(UserErrors[FIREBASE_AUTH_FAILED]);
        }

        const user = await this.userModel.findOne({ email: email }).exec();

        if (!user) {
            return await this.createUserWithFirebaseUID(uid, email, authProvider, userFireBase);
        }
        if (user.authProvider != authProvider) {
            throw new ForbiddenException(UserErrors[USER_EMAIL_ALREADY_EXISTS]);
        }

        return user;
    }

    private async createUserWithFirebaseUID(
        uid: string,
        email: string,
        authProvider: string,
        userFireBase: UserRecord,
    ): Promise<User> {
        let newUser = await new this.userModel({
            email,
            firebaseUID: uid,
        }).save();
        if (userFireBase) {
            newUser.fullName = userFireBase.displayName;
            newUser.authProvider = authProvider;

            if (userFireBase.photoURL) {
                // télécharge et reuploade la photo de profil de l'utilisateur
                const image = await axios.get(
                    userFireBase.photoURL,
                    {responseType: "arraybuffer"}
                );
                newUser.pictureUrl = await this.storageService.uploadUserProfile(
                    Buffer.from(image.data),
                    newUser._id.toString()
                );
            }
        }
        newUser = await newUser.save();

        // création de l'abonnement
        await this.subscriptionService.subscribeToFreePlan(newUser._id.toString());

        return newUser;
    }
}
