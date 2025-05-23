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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const main_database_connection_1 = require("../../../databases/main.database.connection");
const action_shareable_1 = require("../../../common/ClassActions/action.shareable");
const config_1 = require("@nestjs/config");
let ActuService = class ActuService {
    constructor(realisationModel, realisationFileModel, configService) {
        this.realisationModel = realisationModel;
        this.realisationFileModel = realisationFileModel;
        this.configService = configService;
        this.self = this;
    }
    async findAll(pagination) {
        const [data, total] = await Promise.all([
            this.realisationModel
                .find()
                .sort({ createdAt: -1 })
                .skip((pagination.page - 1) * pagination.size)
                .limit(pagination.size)
                .exec(),
            this.realisationModel.countDocuments().exec(),
        ]);
        return { data, total };
    }
    async findOneById(id) {
        const actu = await this.realisationModel.findById(id).exec();
        return actu;
    }
    shareActu(actuId) {
        console.log(actuId);
        return this.self.share(actuId.toString());
    }
};
exports.ActuService = ActuService;
exports.ActuService = ActuService = __decorate([
    (0, common_1.Injectable)(),
    (0, action_shareable_1.Shareable)({
        sharePath: 'actu',
    }),
    __param(0, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __param(1, (0, mongoose_1.InjectModel)(main_database_connection_1.REALISATION_FILE_MODEL_NAME, main_database_connection_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object, Object, config_1.ConfigService])
], ActuService);
//# sourceMappingURL=actu.service.js.map