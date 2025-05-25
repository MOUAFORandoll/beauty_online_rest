import { ApiProperty } from '@nestjs/swagger';
import {
    AgendaModel,
    RealisationModel,
    RendezVous,
    RealisationFileModel,
    CreneauModel,
    RendezVousModel,
} from '../../../databases/services/entities';
import { UserDto } from 'src/app/users/dto';
import { PositionModel, ProfileProfessionnelModel, UserModel } from 'src/databases/users/entities';
import {
    CreneauResponseDto,
    ProfileResponseDto,
    RealisationResponseDto,
} from 'src/app/profile_professionnels/dto';
export class RendezVousResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    user: UserDto;

    @ApiProperty()
    day: Date;

    @ApiProperty()
    realisation: RealisationResponseDto;
    @ApiProperty()
    professional: ProfileResponseDto;

    @ApiProperty()
    professional_phone: string;

    @ApiProperty()
    creneau: CreneauResponseDto;
    static async fromRendezVous(
        userModel: UserModel,
        agendaModel: AgendaModel,
        realisationModel: RealisationModel,
        realisationFileModel: RealisationFileModel,
        creneauModel: CreneauModel,
        profileModel: ProfileProfessionnelModel,
        rendezVousModel: RendezVousModel,
        positionModel: PositionModel,

        rendezVous: RendezVous,
    ): Promise<RendezVousResponseDto> {
        const _user: UserDto = UserDto.fromUser(await userModel.findById(rendezVous.user_id));

        const _crenauReq = await creneauModel.findById(rendezVous.creneau_id);

        const _creneau: CreneauResponseDto = CreneauResponseDto.fromCreneau(_crenauReq);
        const _agenda = await agendaModel.findById(_crenauReq.agenda_id);

          const _realisation: RealisationResponseDto = await RealisationResponseDto.fromRealisation(
            await realisationModel.findById(rendezVous.realisation_id),
            realisationFileModel,
        );

        const profile = await profileModel.findById(_agenda.profile_professionnel_id).exec();
        const _profile = await ProfileResponseDto.fromProfile(
            profile,
            agendaModel,
            positionModel,
            realisationModel,
            rendezVousModel,
        );
        const _userPro: UserDto = await userModel.findById(profile.user_id);

        return {
            id: rendezVous._id.toString(),
            user: _user,
            professional_phone: _userPro.phone,
            creneau: _creneau,
            status: rendezVous.status,
            day: _agenda.day,
            realisation: _realisation,
            professional: _profile,
        };
    }
}
