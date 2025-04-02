import { ApiProperty } from '@nestjs/swagger';
import { ProfilProfessionnel, User } from '../../databases/users/entities';
import { CreateProfilDto } from './profil.request.dto';
import { UserDto } from 'src/users/dto';

export class UpdateProfilDto extends CreateProfilDto {}

export class ProfilResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    namePro: string;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    service: string;
    static fromProfil(profil: ProfilProfessionnel, user: User): ProfilResponseDto {
        const _user: UserDto = UserDto.fromUser(user);
        return {
            id: profil._id as string,
            namePro: profil.namePro,
            user: _user,
            service: profil.service,
        };
    }
}
