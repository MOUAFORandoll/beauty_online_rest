import { UserRecord } from 'firebase-admin/lib/auth/user-record';
export declare class UserAuthenticationDto {
    token: string;
}
export declare class UserRegistrationDto {
    userName: string;
    email: string;
}
export declare class UpdateUserDto {
    userName: string;
    phone: string;
    countryCode: string;
    codePhone: string;
}
export declare class UpdateUserPositionDto {
    longitude: string;
    latitude: string;
    country: string;
    town: string;
    titleEmplacement: string;
}
export declare class FirebaseVerificationDto {
    uid?: string;
    email?: string;
    email_verified: boolean;
    authProvider?: string;
    userFireBase?: UserRecord;
}
