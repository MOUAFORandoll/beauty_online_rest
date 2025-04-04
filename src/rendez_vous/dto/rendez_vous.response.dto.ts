import { ApiProperty } from '@nestjs/swagger';
import { AgendaModel, RealisationModel, RendezVous } from '../../databases/services/entities';
import { UserDto } from 'src/users/dto';
import { UserModel } from 'src/databases/users/entities';
import { AgendaResponseDto, RealisationResponseDto } from 'src/profile_professionnels/dto';
export class RendezVousResponseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    timeOfArrival: string;

    @ApiProperty()
    status: boolean;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    agenda: AgendaResponseDto;

    @ApiProperty()
    realisation: RealisationResponseDto;

    static async fromRendezVous(
        userModel: UserModel,
        agendaModel: AgendaModel,
        realisationModel: RealisationModel,
        rendezVous: RendezVous,
    ): Promise<RendezVousResponseDto> {
        const _user: UserDto = UserDto.fromUser(await userModel.findById(rendezVous.user_id));
        const _agenda: AgendaResponseDto = AgendaResponseDto.fromAgenda(
            await agendaModel.findById(rendezVous.agenda_id),
        );
        const _realisation: RealisationResponseDto = RealisationResponseDto.fromRealisation(
            await realisationModel.findById(rendezVous.realisation_id),
        );

        return {
            id: rendezVous._id as string,
            user: _user,
            timeOfArrival: rendezVous.timeOfArrival,
            status: rendezVous.status,
            agenda: _agenda,
            realisation: _realisation,
        };
    }
}
