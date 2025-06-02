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
exports.FindRealisationDto = exports.UpdateRealisationDto = exports.CreateRealisationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRealisationDto {
}
exports.CreateRealisationDto = CreateRealisationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Titre de la réalisation' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRealisationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Titre de la réalisation' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRealisationDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        required: false,
        description: 'Liste des images',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRealisationDto.prototype, "images", void 0);
class UpdateRealisationDto {
}
exports.UpdateRealisationDto = UpdateRealisationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nouveau titre de la réalisation', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRealisationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nouveau chemin de l'image de la réalisation", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRealisationDto.prototype, "image_path", void 0);
class FindRealisationDto {
}
exports.FindRealisationDto = FindRealisationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Titre de la réalisation (recherche par titre)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindRealisationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindRealisationDto.prototype, "namePro", void 0);
//# sourceMappingURL=actu.request.dto.js.map