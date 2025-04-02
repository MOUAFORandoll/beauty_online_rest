import { ApiProperty } from '@nestjs/swagger';
import { Realisation } from '../../databases/main.database.connection';

export class RealisationResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    profile_professionnel_id: string;
    static fromRealisation(realisation: Realisation): RealisationResponseDto {
        return {
            id: realisation._id as string,
            title: realisation.title,
            profile_professionnel_id: realisation.profile_professionnel_id,
        };
    }
}
