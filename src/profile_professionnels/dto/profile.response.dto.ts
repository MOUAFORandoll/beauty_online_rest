import { ApiProperty } from '@nestjs/swagger';
import { ProfileProfessionnel } from '../../databases/users/entities';
import { CreateProfileDto } from './profile.request.dto'; 

export class UpdateProfileDto extends CreateProfileDto {}
export class ProfileResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    namePro: string;

    @ApiProperty()
    service: string;
    static fromProfile(profile: ProfileProfessionnel): ProfileResponseDto {
        return {
            id: profile._id as string,
            namePro: profile.namePro,
            service: profile.service,
        };
    }
}
