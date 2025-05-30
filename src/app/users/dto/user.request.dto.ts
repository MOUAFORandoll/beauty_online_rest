import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class UserAuthenticationDto {
    @ApiProperty({
        type: String,
        description: 'token not found',
    })
    @IsString()
    @IsNotEmpty()
    token: string;
}

export class UserRegistrationDto {
    @ApiProperty({
        type: String,
        description: 'userName not found',
    })
    @IsString()
    @IsNotEmpty()
    userName: string;
    @ApiProperty({
        type: String,
        description: 'email not found',
    })
    @IsString()
    @IsNotEmpty()
    email: string;
}

export class UpdateUserDto {
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    userName: string;
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    phone: string;
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    countryCode: string;
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    codePhone: string;
}

export class UpdateUserPositionDto {
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    longitude: string;
    @ApiProperty({ type: String, required: false })
    @IsString()
    @IsOptional()
    latitude: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    town: string;

    @ApiProperty()
    titleEmplacement: string;
}

export class FirebaseVerificationDto {
    uid?: string;
    email?: string;
    email_verified: boolean;

    authProvider?: string;
    userFireBase?: UserRecord;
}
