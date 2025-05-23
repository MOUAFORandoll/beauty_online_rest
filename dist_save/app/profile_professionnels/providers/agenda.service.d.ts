import { Agenda, AgendaModel, CreneauModel } from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import { UpdateAgendaDto, CreateAgendaDto, AddCreneauxAgendaDto } from '../dto/agenda.request.dto';
import { ProfileService } from './profile.service';
export declare class AgendaService {
    private readonly agendaModel;
    private readonly creneauModel;
    private readonly profileService;
    constructor(agendaModel: AgendaModel, creneauModel: CreneauModel, profileService: ProfileService);
    create(dto: CreateAgendaDto, user_id: string): Promise<Agenda>;
    findMeProfessionalAgenda(user_id: string, pagination: PaginationPayloadDto): Promise<{
        data: Agenda[];
        total: number;
    }>;
    findProfessionalAgenda(professionalId: string, pagination: PaginationPayloadDto): Promise<{
        data: Agenda[];
        total: number;
    }>;
    addCreneauxToAgenda(idAgenda: string, dto: AddCreneauxAgendaDto): Promise<Agenda>;
    update(id: string, dto: UpdateAgendaDto, options?: QueryOptions): Promise<Agenda>;
    deleteCreneau(idCreneaud: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
