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
exports.ActuResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../profile_professionnels/dto");
class ActuResponseDto {
    static async fromActu(realisation, userId, realisationFileModel, agendaModel, positionModel, realisationModel, rendezVousModel, vueModel, shareModel, likeModel, profileService) {
        const numbreDeVues = await vueModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
        const numbreDeLikes = await likeModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
        const hasLiked = userId == null
            ? false
            : (await likeModel
                .find({ realisation_id: realisation._id.toString(), user_id: userId })
                .countDocuments()
                .exec()) != 0;
        const nombreDePartages = await shareModel
            .find({ realisation_id: realisation._id.toString() })
            .countDocuments()
            .exec();
        const allFiles = await realisationFileModel
            .find({ realisation_id: realisation._id.toString() })
            .exec();
        const formattedFiles = allFiles.map((file) => ({
            id: file._id.toString(),
            file_path: file.file_path,
        }));
        const profile = await profileService.findOneById(realisation.profile_professionnel_id);
        const profileProfessionnel = await dto_1.ProfileResponseDto.fromProfile(profile, agendaModel, positionModel, realisationModel, rendezVousModel);
        return {
            id: realisation._id.toString(),
            title: realisation.title,
            price: realisation.price,
            profile_professionnel: profileProfessionnel,
            realisation_files: formattedFiles,
            nombre_vues: numbreDeVues,
            nombre_likes: numbreDeLikes,
            nombre_partages: nombreDePartages,
            has_liked: hasLiked,
        };
    }
}
exports.ActuResponseDto = ActuResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActuResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActuResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActuResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ActuResponseDto.prototype, "nombre_vues", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ActuResponseDto.prototype, "nombre_likes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ActuResponseDto.prototype, "has_liked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ActuResponseDto.prototype, "nombre_partages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", dto_1.ProfileResponseDto)
], ActuResponseDto.prototype, "profile_professionnel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], ActuResponseDto.prototype, "realisation_files", void 0);
//# sourceMappingURL=actu.response.dto.js.map