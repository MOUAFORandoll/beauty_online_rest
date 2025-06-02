import { AgendaResponseDto } from '../dto';
import { AgendaService } from '../providers';
import * as Database from '../../../databases/users/providers';
import { PaginationPayloadDto, PaginationResponseDto } from 'src/common/apiutils';
import { AddCreneauxAgendaDto, CreateAgendaDto, UpdateAgendaDto } from '../dto/agenda.request.dto';
import { CreneauModel } from 'src/databases/main.database.connection';
export declare class AgendaController {
    private readonly creneauModel;
    private readonly agendaService;
    private readonly dbUsersService;
    constructor(creneauModel: CreneauModel, agendaService: AgendaService, dbUsersService: Database.UsersService);
    create(id: string, dto: CreateAgendaDto): Promise<AgendaResponseDto>;
    findMeProfessionalAgenda(idUser: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<AgendaResponseDto>>;
    findProfessionalAgenda(idProfessionnel: string, pagination: PaginationPayloadDto): Promise<PaginationResponseDto<AgendaResponseDto>>;
    addCreneauxToAgenda(idAgenda: string, idUser: string, dto: AddCreneauxAgendaDto): Promise<AgendaResponseDto>;
    deleteCreneau(idCreneau: string, idUser: string): Promise<void>;
    update(id: string, idUser: string, dto: UpdateAgendaDto): Promise<AgendaResponseDto>;
    delete(id: string, idUser: string): Promise<void>;
}
