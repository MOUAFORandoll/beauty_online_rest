import { RendezVous, RendezVousModel, RealisationModel } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { CreateRendezVousDto } from '../dto/rendez_vous.request.dto';
import { SendNotificationsService } from 'src/common/modules/notifications/providers';
import * as Database from '../../../databases/users/providers';
import { ProfileService } from 'src/app/profile_professionnels/providers';
export declare class RendezVousService {
    private readonly rendezVousModel;
    private readonly realisationModel;
    private readonly dbUsersService;
    private profileService;
    private readonly sendNotificationsService;
    constructor(rendezVousModel: RendezVousModel, realisationModel: RealisationModel, dbUsersService: Database.UsersService, profileService: ProfileService, sendNotificationsService: SendNotificationsService);
    create(dto: CreateRendezVousDto, user_id: string): Promise<RendezVous>;
    findUserRendezVous(user_id: string, pagination: PaginationPayloadDto): Promise<{
        data: RendezVous[];
        total: number;
    }>;
    findPrestataireRendezVous(user_id: string, pagination: PaginationPayloadDto): Promise<{
        data: RendezVous[];
        total: number;
    }>;
    findRendezVousById(id: string): Promise<RendezVous>;
    acceptRdv(id: string): Promise<RendezVous>;
    declineRdv(id: string): Promise<RendezVous>;
    deleteRdv(id: string): Promise<boolean>;
}
