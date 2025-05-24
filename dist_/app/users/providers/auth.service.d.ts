import { AuthFirebaseService } from './auth.firebase.service';
import { UserAuthenticationDto } from '../dto';
import { User, UserModel } from '../../../databases/main.database.connection';
export declare class AuthService {
    private userModel;
    private firebaseAuthService;
    constructor(userModel: UserModel, firebaseAuthService: AuthFirebaseService);
    authentication(payload: UserAuthenticationDto): Promise<User>;
    private createUserWithFirebaseUID;
}
