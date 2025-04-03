// agenda.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    ProfileProfessionnel,
    Agenda,
    AGENDA_MODEL_NAME,
    AgendaModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import { UpdateAgendaDto, CreateAgendaDto } from '../dto/agenda.request.dto';
import {
    PROFILE_PRO_NOT_FOUND,
    ProfileProErrors,
    AGENDA_DELETE_FAILED,
    AGENDA_UPDATE_FAILED,
    AgendaErrors,
} from '../errors';
import { ProfileService } from './profile.service';

@Injectable()
export class AgendaService {
    constructor(
        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,

        private readonly profileService: ProfileService,
    ) {}

    async create(dto: CreateAgendaDto, user_id: string): Promise<Agenda> {
        try {
            const profilePro: ProfileProfessionnel =
                await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
            }
            const agenda = new this.agendaModel({ ...dto }, profilePro._id);
            return await agenda.save();
        } catch (error) {
            throw new Error(`Failed to create agenda: ${error.message}`);
        }
    }

    async findUserAgenda(
        user_id: string,

        pagination: PaginationPayloadDto,
    ): Promise<{ data: Agenda[]; total: number }> {
        const profilePro: ProfileProfessionnel = await this.profileService.findUserProfile(user_id);
        if (!profilePro) {
            throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
        }
        const [data, total] = await Promise.all([
            this.agendaModel
                .find({ profile_professionnel_id: profilePro._id })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.agendaModel
                .countDocuments({ profile_professionnel_id: profilePro._id })
                .exec(),
        ]);

        return { data, total };
    }

    async update(
        id: string,
        dto: UpdateAgendaDto,
        options: QueryOptions = { new: true },
    ): Promise<Agenda> {
        const updatedAgenda = await this.agendaModel
            .findByIdAndUpdate(id, dto, options)
            .exec();

        if (!updatedAgenda) {
            throw new NotFoundException(AgendaErrors[AGENDA_UPDATE_FAILED]);
        }
        return updatedAgenda;
    }

    async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
        const result = await this.agendaModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException(AgendaErrors[AGENDA_DELETE_FAILED]);
        }

        return { deleted: true, message: 'Agenda successfully deleted' };
    }
}
