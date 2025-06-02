import { AuthFirebaseService } from './auth.firebase.service';
import { UserAuthenticationDto } from '../dto';
import { User, UserModel } from '../../../databases/main.database.connection';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
export declare class AuthService {
    private userModel;
    private firebaseAuthService;
    private readonly sendNotificationsService;
    constructor(userModel: UserModel, firebaseAuthService: AuthFirebaseService, sendNotificationsService: SendNotificationsService);
    authentication(payload: UserAuthenticationDto): Promise<User>;
    private createUserWithFirebaseUID;
}
