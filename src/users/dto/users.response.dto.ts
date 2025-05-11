import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../databases/users/entities';

export class UserDto {
    @ApiProperty({
        type: String,
    })
    id: string;
    @ApiProperty({
        type: String,
    })
    email: string;
    @ApiProperty({
        type: String,
    })
    pictureUrl: string;
    @ApiProperty({
        type: String,
    })
    userName: string;
    @ApiProperty({
        type: String,
    })
    firebaseUID: string;

    @ApiProperty({
        type: String,
    })
    countryCode: string;
    @ApiProperty({
        type: String,
    })
    phone: string;

    @ApiProperty({ type: String })
    authProvider: string;

    @ApiProperty({ type: String })
    codePhone: string;

    static fromUser(user: User): UserDto {
        return {
            id: user._id as string,
            pictureUrl: user.pictureUrl,
            email: user.email,
            userName: user.userName,
            firebaseUID: user.firebaseUID,
            authProvider: user.authProvider,
            countryCode: user.countryCode,
            codePhone: user.codePhone,
            phone: user.phone,
        };
    }
}

export class UserAuthenticationResponseDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;
}
