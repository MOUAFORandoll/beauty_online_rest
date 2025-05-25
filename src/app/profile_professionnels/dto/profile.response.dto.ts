import { ApiProperty } from '@nestjs/swagger';
import { PositionModel, ProfileProfessionnel } from '../../../databases/users/entities';

import { AgendaModel, RealisationModel, RendezVousModel } from 'src/databases/services/entities';
import { PositionResponseDto } from './position.response.dto';

export class ProfileResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name_pro: string;

    @ApiProperty()
    service: string;
    @ApiProperty()
    cover: string;
    @ApiProperty()
    description: string;

    @ApiProperty()
    position: PositionResponseDto;
    @ApiProperty()
    nombre_reservation: number;
    @ApiProperty()
    nombre_catalogue: number;
    @ApiProperty()
    nombre_actes: number;

    static async fromProfile(
        profile: ProfileProfessionnel,

        agendaModel: AgendaModel,
        positionModel: PositionModel,
        realisationModel: RealisationModel,
        rendezVousModel: RendezVousModel,
    ): Promise<ProfileResponseDto> {
        // 1. Find Agendas linked to the professional profile
        const agendas = await agendaModel
            .find({ profile_professionnel_id: profile._id }, '_id') // Select only the IDs
            .exec();

        const agendaIds = agendas.map((a) => a._id);

        // 2. Find RendezVous linked to these Agendas
        const query = { agenda_id: { $in: agendaIds } };

        const nombreReservation = await rendezVousModel.countDocuments(query).exec();
        const nombreCatalogue = await realisationModel
            .countDocuments({
                profile_professionnel_id: profile._id,
            })
            .exec();
        const nombreActes = await realisationModel
            .countDocuments({
                profile_professionnel_id: profile._id,
            })
            .exec();
        const position = await positionModel
            .findOne({
                profile_professionnel_id: profile.id,
            })
            .exec();
   
        return {
            id: profile._id.toString(),
            name_pro: profile.namePro,
            service: profile.service,
            cover: profile.cover,
            description: profile.description,
            position: PositionResponseDto.fromPosition(position),
            nombre_reservation: nombreReservation,
            nombre_catalogue: nombreCatalogue,
            nombre_actes: nombreActes,
        };
    }
}
