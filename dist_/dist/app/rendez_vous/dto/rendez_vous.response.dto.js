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
exports.RendezVousResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../users/dto");
const dto_2 = require("../../profile_professionnels/dto");
class RendezVousResponseDto {
    static async fromRendezVous(userModel, agendaModel, realisationModel, realisationFileModel, creneauModel, profileModel, rendezVousModel, positionModel, rendezVous) {
        const _user = dto_1.UserDto.fromUser(await userModel.findById(rendezVous.user_id));
        const _crenauReq = await creneauModel.findById(rendezVous.creneau_id);
        const _creneau = dto_2.CreneauResponseDto.fromCreneau(_crenauReq);
        const _agenda = await agendaModel.findById(_crenauReq.agenda_id);
        const _realisation = await dto_2.RealisationResponseDto.fromRealisation(await realisationModel.findById(rendezVous.realisation_id), realisationFileModel);
        const profile = await profileModel.findById(_agenda.profile_professionnel_id).exec();
        const _profile = await dto_2.ProfileResponseDto.fromProfile(profile, agendaModel, positionModel, realisationModel, rendezVousModel);
        const _userPro = await userModel.findById(profile.user_id);
        return {
            id: rendezVous._id.toString(),
            user: _user,
            professional_phone: _userPro.phone,
            creneau: _creneau,
            status: rendezVous.status,
            day: _agenda.day,
            realisation: _realisation,
            professional: _profile,
        };
    }
}
exports.RendezVousResponseDto = RendezVousResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", dto_1.UserDto)
], RendezVousResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RendezVousResponseDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", dto_2.RealisationResponseDto)
], RendezVousResponseDto.prototype, "realisation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", dto_2.ProfileResponseDto)
], RendezVousResponseDto.prototype, "professional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousResponseDto.prototype, "professional_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", dto_2.CreneauResponseDto)
], RendezVousResponseDto.prototype, "creneau", void 0);
//# sourceMappingURL=rendez_vous.response.dto.js.map