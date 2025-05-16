// agenda.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    ProfileProfessionnel,
    Agenda,
    AGENDA_MODEL_NAME,
    AgendaModel,
    CRENAU_MODEL_NAME,
    CrenauModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import { UpdateAgendaDto, CreateAgendaDto, AddCrenauxAgendaDto } from '../dto/agenda.request.dto';
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
        @InjectModel(CRENAU_MODEL_NAME, DATABASE_CONNECTION)
        private readonly crenauModel: CrenauModel,

        private readonly profileService: ProfileService,
    ) {}

    async create(dto: CreateAgendaDto, user_id: string): Promise<Agenda> {
        try {
            const profilePro: ProfileProfessionnel =
                await this.profileService.findUserProfile(user_id);

            // Création de l'agenda
            const agenda = new this.agendaModel({
                day: dto.day,
                profile_professionnel_id: profilePro._id, // Assure-toi que le champ correspond dans le modèle
            });

            const newAgenda = await agenda.save();
            console.log(dto.crenaux);
            // Création des créneaux de façon séquentielle et fiable
            const crenauxData = dto.crenaux.map((e) => ({
                ...e,
                agenda_id: newAgenda._id,
            }));
            console.log(crenauxData);

            await this.crenauModel.insertMany(crenauxData); // insertMany est plus performant que save() en boucle

            return newAgenda;
        } catch (error) {
            throw new Error('Failed to create agenda: ' + error.message);
        }
    }

    async findMeProfessionalAgenda(
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
            this.agendaModel.countDocuments({ profile_professionnel_id: profilePro._id }).exec(),
        ]);

        return { data, total };
    }

    async findProfessionalAgenda(
        professionalId: string,

        pagination: PaginationPayloadDto,
    ): Promise<{ data: Agenda[]; total: number }> {
        const [data, total] = await Promise.all([
            this.agendaModel
                .find({ profile_professionnel_id: professionalId })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.agendaModel.countDocuments({ profile_professionnel_id: professionalId }).exec(),
        ]);

        return { data, total };
    }

    async addCrenauxToAgenda(idAgenda: string, dto: AddCrenauxAgendaDto): Promise<Agenda> {
        try {
            // Création de l'agenda
            let agenda = await this.agendaModel.findById(idAgenda).exec();

            // Création des créneaux de façon séquentielle et fiable
            const crenauxData = dto.crenaux.map((e) => ({
                ...e,
                agenda: agenda._id,
            }));

            await this.crenauModel.insertMany(crenauxData); // insertMany est plus performant que save() en boucle
            agenda = await this.agendaModel.findById(idAgenda).exec();

            return agenda;
        } catch (error) {
            throw new Error('Failed to create agenda: ' + error.message);
        }
    }

    async update(
        id: string,
        dto: UpdateAgendaDto,
        options: QueryOptions = { new: true },
    ): Promise<Agenda> {
        const updatedAgenda = await this.agendaModel.findByIdAndUpdate(id, dto, options).exec();

        if (!updatedAgenda) {
            throw new NotFoundException(AgendaErrors[AGENDA_UPDATE_FAILED]);
        }
        return updatedAgenda;
    }

    async deleteCrenau(idCrenaud: string): Promise<{ deleted: boolean; message?: string }> {
        const result = await this.crenauModel.findByIdAndDelete(idCrenaud).exec();

        if (!result) {
            throw new NotFoundException(AgendaErrors[AGENDA_DELETE_FAILED]);
        }

        return { deleted: true, message: 'Agenda successfully deleted' };
    }
    async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
        const result = await this.agendaModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException(AgendaErrors[AGENDA_DELETE_FAILED]);
        }

        return { deleted: true, message: 'Agenda successfully deleted' };
    }
}
