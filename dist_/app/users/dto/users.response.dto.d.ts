import { User } from '../../../databases/users/entities';
export declare class UserDto {
    id: string;
    email: string;
    pictureUrl: string;
    userName: string;
    firebaseUID: string;
    countryCode: string;
    phone: string;
    authProvider: string;
    codePhone: string;
    static fromUser(user: User): UserDto;
}
export declare class UserAuthenticationResponseDto {
    user: UserDto;
}
