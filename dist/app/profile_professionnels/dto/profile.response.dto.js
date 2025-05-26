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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const position_response_dto_1 = require("./position.response.dto");
class ProfileResponseDto {
    static async fromProfile(profile, agendaModel, positionModel, realisationModel, rendezVousModel) {
        const agendas = await agendaModel
            .find({ profile_professionnel_id: profile._id }, '_id')
            .exec();
        const agendaIds = agendas.map((a) => a._id);
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
            position: position_response_dto_1.PositionResponseDto.fromPosition(position),
            nombre_reservation: nombreReservation,
            nombre_catalogue: nombreCatalogue,
            nombre_actes: nombreActes,
        };
    }
}
exports.ProfileResponseDto = ProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "name_pro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "cover", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_response_dto_1.PositionResponseDto)
], ProfileResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProfileResponseDto.prototype, "nombre_reservation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProfileResponseDto.prototype, "nombre_catalogue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProfileResponseDto.prototype, "nombre_actes", void 0);
//# sourceMappingURL=profile.response.dto.js.map