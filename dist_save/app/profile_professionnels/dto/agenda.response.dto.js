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
exports.AgendaResponseDto = exports.CreneauResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreneauResponseDto {
    static fromCreneau(creneau) {
        return {
            id: creneau._id.toString(),
            startTimeAvailable: creneau.startTimeAvailable,
            endTimeAvailable: creneau.endTimeAvailable,
        };
    }
}
exports.CreneauResponseDto = CreneauResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreneauResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreneauResponseDto.prototype, "startTimeAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreneauResponseDto.prototype, "endTimeAvailable", void 0);
class AgendaResponseDto {
    static async fromAgenda(agenda, creneauModel) {
        const creneaux = await creneauModel.find({ agenda_id: agenda._id }).exec();
        return {
            id: agenda._id.toString(),
            day: agenda.day,
            creneaux: creneaux.map((cr) => CreneauResponseDto.fromCreneau(cr)),
        };
    }
}
exports.AgendaResponseDto = AgendaResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgendaResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AgendaResponseDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreneauResponseDto] }),
    __metadata("design:type", Array)
], AgendaResponseDto.prototype, "creneaux", void 0);
//# sourceMappingURL=agenda.response.dto.js.map