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
exports.RealisationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RealisationResponseDto {
    static async fromRealisation(realisation, realisationFileModel) {
        const allFiles = await realisationFileModel
            .find({ realisation_id: realisation._id })
            .exec();
        const formattedFiles = allFiles.map((file) => ({
            id: file._id.toString(),
            file_path: file.file_path,
        }));
        return {
            id: realisation._id.toString(),
            title: realisation.title,
            price: realisation.price,
            profile_professionnel_id: realisation.profile_professionnel_id.toString(),
            realisation_files: formattedFiles,
        };
    }
}
exports.RealisationResponseDto = RealisationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RealisationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RealisationResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RealisationResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RealisationResponseDto.prototype, "profile_professionnel_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], RealisationResponseDto.prototype, "realisation_files", void 0);
//# sourceMappingURL=realisation.response.dto.js.map