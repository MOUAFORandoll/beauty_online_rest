import { UserAuthenticationDto, UserAuthenticationResponseDto } from '../dto';
import { AuthService } from '../providers';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authenticateUser(payload: UserAuthenticationDto): Promise<UserAuthenticationResponseDto>;
}
