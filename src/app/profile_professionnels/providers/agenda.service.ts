// agenda.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
    ProfileProfessionnel,
    Agenda,
    AGENDA_MODEL_NAME,
    AgendaModel,
    CRENEAU_MODEL_NAME,
    CreneauModel,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils';
import { QueryOptions } from 'mongoose';
import { UpdateAgendaDto, CreateAgendaDto, AddCreneauxAgendaDto } from '../dto/agenda.request.dto';
import {
    PROFILE_PRO_NOT_FOUND,
    ProfileProErrors,
    AGENDA_DELETE_FAILED,
    AGENDA_UPDATE_FAILED,
    AgendaErrors,
} from '../errors';
import { ProfileService } from './profile.service';
import dayjs from 'dayjs';
@Injectable()
export class AgendaService {
    constructor(
        @InjectModel(AGENDA_MODEL_NAME, DATABASE_CONNECTION)
        private readonly agendaModel: AgendaModel,
        @InjectModel(CRENEAU_MODEL_NAME, DATABASE_CONNECTION)
        private readonly creneauModel: CreneauModel,

        private readonly profileService: ProfileService,
    ) {}

    async create(dto: CreateAgendaDto, user_id: string): Promise<Agenda> {
        try {
            const profilePro = await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new NotFoundException(ProfileProErrors[PROFILE_PRO_NOT_FOUND]);
            }

            // Normalise la date : compare uniquement Y-M-D
            const targetDay = dayjs(dto.day).startOf('day').toDate();

            let agenda = await this.agendaModel.findOne({
                profile_professionnel_id: profilePro._id,
                day: {
                    $gte: dayjs(targetDay).startOf('day').toDate(),
                    $lte: dayjs(targetDay).endOf('day').toDate(),
                },
            });

            // Si l'agenda n'existe pas, on le crée
            if (!agenda) {
                agenda = new this.agendaModel({
                    day: targetDay,
                    profile_professionnel_id: profilePro._id,
                });
                agenda = await agenda.save();
            }

            // Vérifie les créneaux déjà présents pour cet agenda
            const existingCreneaux = await this.creneauModel.find({ agenda_id: agenda._id }).exec();

            // Filtrage des créneaux déjà existants (même heure début/fin)
            const newCreneaux = dto.creneaux.filter((newCreneau) => {
                return !existingCreneaux.some(
                    (existing) =>
                        existing.startTimeAvailable === newCreneau.startTimeAvailable &&
                        existing.endTimeAvailable === newCreneau.endTimeAvailable,
                );
            });

            // Ajout uniquement des nouveaux créneaux
            if (newCreneaux.length > 0) {
                const creneauxToInsert = newCreneaux.map((e) => ({
                    ...e,
                    agenda_id: agenda._id,
                }));

                await this.creneauModel.insertMany(creneauxToInsert);
            }

            return agenda;
        } catch (error) {
            throw new Error(`Failed to create/update agenda: ${error.message}`);
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

    async addCreneauxToAgenda(idAgenda: string, dto: AddCreneauxAgendaDto): Promise<Agenda> {
        try {
            // Création de l'agenda
            let agenda = await this.agendaModel.findById(idAgenda).exec();

            // Création des créneaux de façon séquentielle et fiable
            const creneauxData = dto.creneaux.map((e) => ({
                ...e,
                agenda: agenda._id,
            }));

            await this.creneauModel.insertMany(creneauxData); // insertMany est plus performant que save() en boucle
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

    async deleteCreneau(idCreneaud: string): Promise<{ deleted: boolean; message?: string }> {
        const result = await this.creneauModel.findByIdAndDelete(idCreneaud).exec();

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
