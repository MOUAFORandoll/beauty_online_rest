"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const errors_1 = require("../errors");
const profile_service_1 = require("./profile.service");
const dayjs_1 = __importDefault(require("dayjs"));
let AgendaService = class AgendaService {
    constructor(agendaModel, creneauModel, profileService) {
        this.agendaModel = agendaModel;
        this.creneauModel = creneauModel;
        this.profileService = profileService;
    }
    async create(dto, user_id) {
        try {
            const profilePro = await this.profileService.findUserProfile(user_id);
            if (!profilePro) {
                throw new common_1.NotFoundException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
            }
            const targetDay = (0, dayjs_1.default)(dto.day).startOf('day').toDate();
            let agenda = await this.agendaModel.findOne({
                profile_professionnel_id: profilePro._id,
                day: {
                    $gte: (0, dayjs_1.default)(targetDay).startOf('day').toDate(),
                    $lte: (0, dayjs_1.default)(targetDay).endOf('day').toDate(),
                },
            });
            if (!agenda) {
                agenda = new this.agendaModel({
                    day: targetDay,
                    profile_professionnel_id: profilePro._id,
                });
                agenda = await agenda.save();
            }
            const existingCreneaux = await this.creneauModel.find({ agenda_id: agenda._id }).exec();
            const newCreneaux = dto.creneaux.filter((newCreneau) => {
                return !existingCreneaux.some((existing) => existing.startTimeAvailable === newCreneau.startTimeAvailable &&
                    existing.endTimeAvailable === newCreneau.endTimeAvailable);
            });
            if (newCreneaux.length > 0) {
                const creneauxToInsert = newCreneaux.map((e) => ({
                    ...e,
                    agenda_id: agenda._id,
                }));
                await this.creneauModel.insertMany(creneauxToInsert);
            }
            return agenda;
        }
        catch (error) {
            throw new Error(`Failed to create/update agenda: ${error.message}`);
        }
    }
    async findMeProfessionalAgenda(user_id, pagination) {
        const profilePro = await this.profileService.findUserProfile(user_id);
        if (!profilePro) {
            throw new common_1.NotFoundException(errors_1.ProfileProErrors[errors_1.PROFILE_PRO_NOT_FOUND]);
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
    async findProfessionalAgenda(professionalId, pagination) {
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
    async addCreneauxToAgenda(idAgenda, dto) {
        try {
            let agenda = await this.agendaModel.findById(idAgenda).exec();
            const creneauxData = dto.creneaux.map((e) => ({
                ...e,
                agenda: agenda._id,
            }));
            await this.creneauModel.insertMany(creneauxData);
            agenda = await this.agendaModel.findById(idAgenda).exec();
            return agenda;
        }
        catch (error) {
            throw new Error('Failed to create agenda: ' + error.message);
        }
    }
    async update(id, dto, options = { new: true }) {
        const updatedAgenda = await this.agendaModel.findByIdAndUpdate(id, dto, options).exec();
        if (!updatedAgenda) {
            throw new common_1.NotFoundException(errors_1.AgendaErrors[errors_1.AGENDA_UPDATE_FAILED]);
        }
        return updatedAgenda;
    }
    async deleteCreneau(idCreneaud) {
        const result = await this.creneauModel.findByIdAndDelete(idCreneaud).exec();
        if (!result) {
            throw new common_1.NotFoundException(errors_1.AgendaErrors[errors_1.AGENDA_DELETE_FAILED]);
        }
        return { deleted: true, message: 'Agenda successfully deleted' };
    }
    async delete(id) {
        const result = await this.agendaModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(errors_1.AgendaErrors[errors_1.AGENDA_DELETE_FAILED]);
        }
        return { deleted: true, message: 'Agenda successfully deleted' };
    }
};
exports.AgendaService = AgendaService;
exports.AgendaService = AgendaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.AGENDA_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.CRENEAU_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object, profile_service_1.ProfileService])
], AgendaService);
//# sourceMappingURL=agenda.service.js.map