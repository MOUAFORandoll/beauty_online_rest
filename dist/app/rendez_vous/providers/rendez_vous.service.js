"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVousService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const errors_1 = require("../errors");
const mongoose_2 = require("mongoose");
const providers_1 = require("../../../common/modules/notifications/providers");
const Database = __importStar(require("../../../databases/users/providers"));
const providers_2 = require("../../profile_professionnels/providers");
let RendezVousService = class RendezVousService {
    constructor(rendezVousModel, realisationModel, dbUsersService, profileService, sendNotificationsService) {
        this.rendezVousModel = rendezVousModel;
        this.realisationModel = realisationModel;
        this.dbUsersService = dbUsersService;
        this.profileService = profileService;
        this.sendNotificationsService = sendNotificationsService;
    }
    async create(dto, user_id) {
        try {
            const rendezVous = new this.rendezVousModel({
                creneau_id: new mongoose_2.Types.ObjectId(dto.creneau_id),
                realisation_id: new mongoose_2.Types.ObjectId(dto.realisation_id),
                status: main_database_connection_1.StatusRendezVous.ATTENTE,
                user_id: new mongoose_2.Types.ObjectId(user_id),
            });
            await rendezVous.save();
            const realisation = await this.realisationModel.findById(rendezVous.realisation_id);
            const profile = await this.profileService.findOneById(realisation.profile_professionnel_id);
            const user = await this.dbUsersService.getUser(profile.user_id);
            await this.sendNotificationsService.sendNewRdvNotification(user, rendezVous._id.toString());
            return this.findRendezVousById(rendezVous.id);
        }
        catch (error) {
            throw new Error(`Failed to create rendezVous: ${error.message}`);
        }
    }
    async findUserRendezVous(user_id, pagination) {
        const [data, total] = await Promise.all([
            this.rendezVousModel
                .find({ user_id: user_id })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.rendezVousModel.countDocuments({ user_id: user_id }).exec(),
        ]);
        return { data, total };
    }
    async findPrestataireRendezVous(user_id, pagination) {
        try {
            const profile = await this.profileService.findUserProfile(user_id);
            if (!profile) {
                return { data: [], total: 0 };
            }
            const pipeline = [
                {
                    $lookup: {
                        from: 'creneaux',
                        localField: 'creneau_id',
                        foreignField: '_id',
                        as: 'creneau',
                    },
                },
                { $unwind: { path: '$creneau', preserveNullAndEmptyArrays: false } },
                {
                    $lookup: {
                        from: 'agendas',
                        localField: 'creneau.agenda_id',
                        foreignField: '_id',
                        as: 'agenda',
                    },
                },
                { $unwind: { path: '$agenda', preserveNullAndEmptyArrays: false } },
                {
                    $match: {
                        'agenda.profile_professionnel_id': profile._id,
                    },
                },
                {
                    $facet: {
                        data: [
                            { $sort: { timeOfArrival: 1 } },
                            { $skip: (pagination.page - 1) * pagination.size },
                            { $limit: pagination.size },
                        ],
                        totalCount: [{ $count: 'count' }],
                    },
                },
            ];
            const result = await this.rendezVousModel.aggregate(pipeline).exec();
            const data = result[0]?.data ?? [];
            const total = result[0]?.totalCount[0]?.count ?? 0;
            return { data, total };
        }
        catch (error) {
            console.error(`Error during aggregation for prestataire ${user_id}:`, error);
            throw new Error(`Failed to fetch rendez-vous: ${error.message}`);
        }
    }
    async findRendezVousById(id) {
        const rendezVous = await this.rendezVousModel.findById(id).exec();
        if (!rendezVous) {
            throw new common_1.NotFoundException(errors_1.RendezVousErrors.RENDEZ_VOUS_NOT_FOUND);
        }
        return rendezVous;
    }
    async acceptRdv(id) {
        const rendezVous = await this.findRendezVousById(id);
        rendezVous.status = main_database_connection_1.StatusRendezVous.ACCEPTER;
        const updatedRendezVous = await rendezVous.save();
        const user = await this.dbUsersService.getUser(updatedRendezVous.user_id);
        await this.sendNotificationsService.sendRdvAcceptedNotification(user, id);
        return updatedRendezVous;
    }
    async declineRdv(id) {
        const rendezVous = await this.findRendezVousById(id);
        rendezVous.status = main_database_connection_1.StatusRendezVous.REFUSER;
        const updatedRendezVous = await rendezVous.save();
        const user = await this.dbUsersService.getUser(updatedRendezVous.user_id);
        await this.sendNotificationsService.sendRdvRefusedNotification(user, id);
        return updatedRendezVous;
    }
    async deleteRdv(id) {
        const result = await this.rendezVousModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(errors_1.RENDEZ_VOUS_DELETE_FAILED);
        }
        return true;
    }
};
exports.RendezVousService = RendezVousService;
exports.RendezVousService = RendezVousService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.RENDEZ_VOUS_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object, Database.UsersService, providers_2.ProfileService,
        providers_1.SendNotificationsService])
], RendezVousService);
//# sourceMappingURL=rendez_vous.service.js.map